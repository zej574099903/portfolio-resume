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
  title: 'Liora - 资深前端工程师 | Senior Frontend Developer',
  description:
    '7年前端开发经验,精通 React/Vue/Next.js/TypeScript。擅长构建高性能 Web 应用和解决复杂技术问题。',
  keywords: [
    '前端工程师',
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Vue',
    'Node.js',
  ],
  authors: [{ name: 'Liora', url: 'https://github.com/zej574099903' }],
  creator: 'Liora',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: 'Liora - 资深前端工程师',
    description: '7年前端开发经验,精通现代前端技术栈',
    siteName: 'Liora的作品集',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liora - 资深前端工程师',
    description: '7年前端开发经验,精通现代前端技术栈',
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
