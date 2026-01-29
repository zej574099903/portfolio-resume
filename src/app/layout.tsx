import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/layout/site-header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Liora - 资深全栈工程师 & 产品主理人 | Senior Full Stack Engineer',
  description:
    '7年全栈开发经验, 专注于高性能 Web 应用构建与极致用户体验设计。精通 React, Next.js, Node.js, 设计系统与互动创意。',
  keywords: [
    '全栈工程师',
    'Full Stack Engineer',
    'Senior Product Manager',
    'React',
    'Next.js',
    'TypeScript',
    'Design System',
    'Creative Developer',
  ],
  authors: [{ name: 'Liora', url: 'https://github.com/zej574099903' }],
  creator: 'Liora',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: 'Liora - 资深全栈工程师 & 产品主理人',
    description: '7年全栈开发与产品经验, 打造极致 Web 体验',
    siteName: 'Liora的作品集',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liora - 资深全栈工程师',
    description: '7年全栈开发与产品经验, 打造极致 Web 体验',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Liora CV',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
