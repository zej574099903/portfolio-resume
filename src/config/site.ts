export const siteConfig = {
  name: 'Liora',
  description:
    '资深前端工程师的作品集网站。展示 7 年前端开发经验，包括 Next.js, TypeScript, React 等技术栈。',
  url: 'https://zhouenjun.com',
  ogImage: 'https://zhouenjun.com/og.jpg',
  links: {
    github: 'https://github.com/zej574099903',
    mail: 'mailto:zej574099903@gmail.com', // 假设邮箱
  },
};

export type SiteConfig = typeof siteConfig;

export const navConfig = {
  mainNav: [
    {
      title: '首页',
      href: '/',
    },
    {
      title: '关于我',
      href: '/#about',
    },
    {
      title: '工作经历',
      href: '/#experience',
    },
    {
      title: '项目作品',
      href: '/#projects',
    },
  ],
  sidebarNav: [
    {
      title: '快速导航',
      items: [
        {
          title: '首页',
          href: '/',
        },
        {
          title: '关于我',
          href: '/#about',
        },
        {
          title: '工作经历',
          href: '/#experience',
        },
        {
          title: '项目作品',
          href: '/#projects',
        },
      ],
    },
  ],
};
