import Link from 'next/link';
import { GoogleIcon } from '@/components/ui/Icon';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs text-primary-500">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-primary-500 transition-colors hover:text-primary-900"
          >
            <GoogleIcon name="home" size={15} />
            <span>Beranda</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              <GoogleIcon name="chevron_right" size={15} className="text-stone-400" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary-900 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-primary-900" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
