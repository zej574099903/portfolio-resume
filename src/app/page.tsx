/**
 * 首页组件 - Home Page
 *
 * 这是网站的入口页面,展示:
 * 1. Hero Section - 第一印象,包含个人介绍和职业定位
 * 2. 现代化的设计风格和微交互
 * 3. 移动端响应式布局
 *
 * 技术亮点:
 * - TypeScript 严格类型
 * - Tailwind CSS 设计系统
 * - 语义化 HTML
 * - SEO 优化
 */

export default function Home() {
  return (
    <div className="relative container">
      <main className="flex flex-col items-center justify-center py-16 text-center md:py-24">
        {/* Hero Section - 首屏区域 */}
        <div className="flex min-h-[80vh] flex-col items-center justify-center">
          {/* 状态标签 */}
          <div className="border-border bg-secondary/50 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-muted-foreground">
              开放工作机会 | Open to Work
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="text-foreground mb-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            你好,我是{' '}
            <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
              Liora
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-muted-foreground mb-4 max-w-2xl text-lg md:text-xl">
            资深前端工程师 · 7年经验
          </p>

          <p className="text-muted-foreground mb-12 max-w-3xl text-base leading-relaxed md:text-lg">
            专注于构建高性能、用户体验优秀的 Web
            应用。精通现代前端技术栈,具备全栈开发能力。
            <br />
            擅长解决复杂的技术问题,并将最佳实践落地到实际项目中。
          </p>

          {/* CTA 按钮组 */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="group bg-primary text-primary-foreground hover:shadow-primary/20 inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-medium transition-all hover:opacity-90 hover:shadow-lg"
            >
              查看项目经历
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>

            <a
              href="#contact"
              className="border-border bg-background text-foreground hover:bg-secondary inline-flex items-center justify-center gap-2 rounded-lg border px-8 py-3 text-sm font-medium transition-all hover:shadow-md"
            >
              联系我
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>

          {/* 技术栈快速预览 */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Vue',
              'Node.js',
              'MongoDB',
              'Tailwind CSS',
            ].map((tech) => (
              <span
                key={tech}
                className="border-border bg-card text-card-foreground hover:bg-accent rounded-md border px-3 py-1 text-xs font-medium transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 统计数据区 */}
        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: '工作年限', value: '7', unit: '年' },
            { label: '完成项目', value: '20', unit: '+' },
            { label: '技术栈', value: '15', unit: '+' },
            { label: '代码质量', value: '95', unit: '%' },
          ].map((stat, index) => (
            <div
              key={index}
              className="border-border bg-card hover:shadow-primary/5 rounded-xl border p-6 transition-all hover:shadow-lg"
            >
              <div className="text-foreground mb-2 text-3xl font-bold">
                {stat.value}
                <span className="text-primary">{stat.unit}</span>
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 滚动提示 */}
        <div className="mt-24 flex justify-center">
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            <span className="text-xs">向下滚动了解更多</span>
            <svg
              className="h-5 w-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </main>

      {/* 临时的项目和联系部分 (占位符,待后续开发) */}
      <section id="projects" className="bg-secondary/20 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold">项目经历</h2>
          <p className="text-muted-foreground">即将推出...</p>
        </div>
      </section>

      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold">联系方式</h2>
          <p className="text-muted-foreground">即将推出...</p>
        </div>
      </section>
    </div>
  );
}
