# ADR-004: Monetary Precision and Indonesian Rupiah (IDR) Handling

## Status
Accepted

## Date
2026-09-22

## Context
Standard JavaScript numbers use IEEE 754 double-precision floating-point format. When performing multiplications of currency values by fractional percentages (e.g., `Rp125.000 * 0.0425 = 5312.5`), floating-point representation artifacts can lead to outputs such as `Rp5.312,500000000001` or rounding drift across multiple fee additions.

In financial applications, displaying floating-point artifacts destroys user trust. Furthermore, currency handling varies by country:
- In the United States (USD), monetary amounts have cents (2 decimal places).
- In Indonesia (IDR), the fractional unit (*sen*) has been obsolete and out of commercial circulation for decades. All commercial e-commerce marketplace settlements (Shopee, Tokopedia, TikTok, Lazada) settle in **whole Indonesian Rupiah (integer IDR)**, rounding fractional amounts to the nearest whole Rupiah.

## Decision
We establish a strict monetary calculation and formatting convention:
1. **Integer Representation for Stored Amounts:**
   - All monetary input values (`sellingPrice`, `productCost`, `advertisingCost`, `voucherCost`, `shippingSubsidy`) are treated as positive integer numbers representing whole Rupiah.
2. **Deterministic Step-by-Step Rounding:**
   - For every individual fee component $i$, the calculated fee amount is rounded immediately to the nearest integer:
     $$\text{Fee}_i = \text{Math.round}(\text{sellingPrice} \times \text{rate}_i)$$
   - This mirrors actual marketplace settlement invoices, where each line item on a settlement statement is individually rounded to whole Rupiah before sum aggregation.
3. **No External Decimal Libraries:**
   - Because Indonesian Rupiah requires only integer precision for monetary balances, heavy external libraries (`decimal.js`, `bignumber.js`) are unnecessary overhead.
4. **Indonesian Locale Formatting:**
   - Monetary formatting is centralized in `src/lib/formatting/currency.ts` using `Intl.NumberFormat('id-ID')`:
     - Format: `Rp100.000` (no decimals, period `.` as thousand separator).
     - Clean fallback for parsing raw user input string to clean integer (`"Rp 100.000"` -> `100000`).

## Alternatives Considered

### 1. Raw IEEE 754 Floating-Point without Explicit Step Rounding
- *Pros:* Zero implementation effort.
- *Cons:* Visual precision glitches (`Rp4.250,000000000001`) that make the tool look amateurish and unvetted.
- *Rejected:* Unacceptable for a financial utility.

### 2. External BigNumber / Decimal.js Library
- *Pros:* Arbitrary precision arithmetic.
- *Cons:* Adds 30KB+ to the client bundle; converts numbers into wrapper objects with verbose method chaining (`a.times(b).plus(c)`).
- *Rejected:* IDR operates in whole integers; arbitrary precision decimals add complexity without providing practical value.

### 3. Sub-unit Representation (e.g. storing Rupiah * 100 as "cents")
- *Pros:* Standard practice for currencies like USD, EUR, GBP.
- *Cons:* Pointless mental overhead in Indonesia where the base unit is already the smallest practical commercial unit. Causes confusion when parsing user inputs and interacting with marketplace fee schedules.
- *Rejected:* Unnecessary indirection for IDR.

## Consequences
- **Positive:**
  - 100% clean formatting (`Rp100.000`) across all outputs.
  - Calculation results match seller bank payouts and marketplace settlement statements to the exact Rupiah.
  - Zero third-party library bloat.
- **Negative / Trade-offs:**
  - Percentage rates themselves (e.g. `0.0425` or `4.25%`) must retain floating-point precision during multiplication before the final `Math.round()` step.
