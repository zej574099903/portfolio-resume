'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { NavItem } from '@/types/nav';

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mr-6 flex items-center space-x-2 font-bold select-none"
      >
        <span className="hidden sm:inline-block">Liora</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        {items?.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'hover:text-foreground/80 transition-colors',
              pathname === item.href ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
