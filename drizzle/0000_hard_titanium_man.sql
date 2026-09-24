CREATE TABLE "affiliate_clicks" (
	"id" serial PRIMARY KEY NOT NULL,
	"marketplace" varchar(50) NOT NULL,
	"product_id" text NOT NULL,
	"query" text,
	"client_ip_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "price_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"query" text NOT NULL,
	"marketplace" varchar(50) NOT NULL,
	"product_id" text NOT NULL,
	"product_title" text NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trending_searches" (
	"id" serial PRIMARY KEY NOT NULL,
	"query" text NOT NULL,
	"search_count" integer DEFAULT 1 NOT NULL,
	"last_searched_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "trending_searches_query_unique" UNIQUE("query")
);
