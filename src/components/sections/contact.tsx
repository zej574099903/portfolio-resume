'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Github,
  MessageSquare,
  ArrowUpRight,
  Copy,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const onCopyEmail = () => {
    navigator.clipboard.writeText('574099903@qq.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative container py-24 md:py-32">
      <div className="bg-card border-border/50 relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] border p-8 text-center md:p-16">
        {/* Decorative Background */}
        <div className="bg-primary/20 pointer-events-none absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              Ready to Craft <br />
              <span className="text-primary">Something Amazing?</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              目前正在寻找新的机会。如果您对我的技术栈或项目经历感兴趣，欢迎随时联系。
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-8 md:flex-row">
            <Button
              size="lg"
              className="shadow-primary/20 h-14 gap-2 rounded-full px-8 text-lg shadow-xl"
              onClick={() => (window.location.href = 'mailto:574099903@qq.com')}
            >
              <Mail className="h-5 w-5" />
              Send an Email
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-secondary/50 h-14 rounded-full border-2 px-6"
                onClick={onCopyEmail}
              >
                <span className="mr-2 font-mono">574099903@qq.com</span>
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 pt-12 md:grid-cols-4 md:gap-8">
            <ContactItem
              icon={Phone}
              label="Phone"
              value="+86 151-5880-2043"
              href="tel:+8615158802043"
            />
            <ContactItem
              icon={MessageSquare}
              label="WeChat"
              value="15158802043"
            />
            <ContactItem
              icon={Github}
              label="GitHub"
              value="@zej574099903"
              href="https://github.com/zej574099903"
            />
            <ContactItem
              icon={Check}
              label="Status"
              value="Open to Work"
              className="text-green-500"
            />
          </div>
        </motion.div>
      </div>

      <footer className="text-muted-foreground mt-24 text-center text-sm">
        <p>
          © {new Date().getFullYear()} Liora (Zhou Enjun). All rights reserved.
        </p>
        <p className="mt-2 text-xs opacity-50">
          Designed & Built with Next.js, Tailwind & Motion.
        </p>
      </footer>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  className?: string;
}) {
  const content = (
    <div className="group flex cursor-pointer flex-col items-center gap-2">
      <div className="bg-secondary/50 group-hover:bg-primary/10 mb-1 rounded-2xl p-4 transition-colors">
        <Icon
          className={cn(
            'text-muted-foreground group-hover:text-primary h-6 w-6 transition-colors',
            className
          )}
        />
      </div>
      <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {label}
      </span>
      <span className="flex items-center gap-1 text-sm font-medium">
        {value}
        {href && (
          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </span>
    </div>
  );

  return href ? (
    <Link href={href} target={href.startsWith('http') ? '_blank' : undefined}>
      {content}
    </Link>
  ) : (
    content
  );
}
