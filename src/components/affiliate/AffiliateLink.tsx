import { ReactNode } from 'react';
import { GoogleIcon } from '@/components/ui/Icon';
import { resolveAffiliateUrl, AFFILIATE_PROVIDERS } from '@/config/affiliate';
import { clsx } from 'clsx';

interface AffiliateLinkProps {
  providerKey: string;
  children?: ReactNode;
  className?: string;
  showIcon?: boolean;
}

export function AffiliateLink({
  providerKey,
  children,
  className,
  showIcon = true,
}: AffiliateLinkProps) {
  const provider = AFFILIATE_PROVIDERS[providerKey];
  const destinationUrl = resolveAffiliateUrl(providerKey);

  return (
    <a
      href={destinationUrl}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium transition-colors hover:underline',
        className
      )}
    >
      <span>{children || provider?.label || 'Kunjungi Situs'}</span>
      {showIcon && <GoogleIcon name="open_in_new" size={13} className="opacity-70" />}
    </a>
  );
}
