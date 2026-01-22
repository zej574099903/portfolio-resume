import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '周恩隽 - 资深前端工程师 | Senior Frontend Developer',
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
  authors: [{ name: '周恩隽', url: 'https://github.com/yourusername' }],
  creator: '周恩隽',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: '周恩隽 - 资深前端工程师',
    description: '7年前端开发经验,精通现代前端技术栈',
    siteName: '周恩隽的作品集',
  },
  twitter: {
    card: 'summary_large_image',
    title: '周恩隽 - 资深前端工程师',
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
        {children}
      </body>
    </html>
  );
}
