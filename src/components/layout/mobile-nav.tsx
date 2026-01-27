'use client';

import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Zap } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { NavConfig } from '@/types/nav';

interface MobileNavProps {
  navConfig: NavConfig;
}

export function MobileNav({ navConfig }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-background/60 border-r border-white/10 pr-0 backdrop-blur-xl"
      >
        {/* Generative Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
          <div className="absolute right-[-20%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
        </div>

        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>

        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <span className="relative mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
            <Zap className="h-4 w-4 fill-current text-white" />
          </span>
          <span className="text-xl font-bold tracking-tight">Liora</span>
        </MobileLink>

        <div className="relative z-10 my-8 flex h-[calc(100vh-8rem)] flex-col justify-between pr-6 pb-10 pl-2">
          <div className="flex flex-col space-y-6">
            {navConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className="text-foreground/80 hover:text-foreground text-2xl font-medium transition-all duration-300 hover:pl-2"
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>

          {/* Mobile Footer Area */}
          <div className="space-y-4">
            <div className="via-border h-px w-full bg-gradient-to-r from-transparent to-transparent" />
            <div className="text-muted-foreground flex flex-col gap-2 text-sm">
              <p>Based in Hangzhou</p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Open to Work
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
