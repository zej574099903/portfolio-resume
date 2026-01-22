# 个人简历作品集网站 (Portfolio Resume)

<div align="center">

**一个面向高级前端工程师的全栈作品集网站项目**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)

</div>

---

## 📖 项目简介

这是一个专业的全栈简历网站项目，旨在展示前端技术深度和工程化能力。它不仅仅是一个静态简历页面，而是一个包含以下亮点的**完整 Web 应用**：

- ✅ **现代化技术栈**: Next.js 15 + TypeScript + Tailwind CSS
- ✅ **全栈能力**: 集成 MongoDB 数据库 + Prisma ORM
- ✅ **移动端优化**: Mobile-first 响应式设计
- ✅ **工程化规范**: ESLint + Prettier + Husky + Commitlint
- ✅ **交互体验**: Framer Motion 动画 + Shadcn/UI 组件
- ✅ **性能优化**: 服务端渲染 (SSR) + 静态生成 (SSG)

---

## 🚀 技术栈

### 核心框架

- **[Next.js 15](https://nextjs.org)** - React 全栈框架 (App Router)
- **[React 19](https://react.dev)** - UI 库
- **[TypeScript](https://www.typescriptlang.org)** - 类型安全 (严格模式)

### 样式与 UI

- **[Tailwind CSS 4](https://tailwindcss.com)** - 原子化 CSS 框架
- **[Shadcn/UI](https://ui.shadcn.com)** - 无头组件库 (计划)
- **[Framer Motion](https://www.framer.com/motion/)** - 动画库 (计划)

### 后端与数据

- **[Prisma](https://www.prisma.io)** - 类型安全的 ORM (计划)
- **[MongoDB](https://www.mongodb.com)** - NoSQL 数据库 (计划)
- **Next.js Server Actions** - 服务端逻辑

### 代码质量

- **[ESLint](https://eslint.org)** - 代码检查
- **[Prettier](https://prettier.io)** - 代码格式化
- **[Husky](https://typicode.github.io/husky/)** - Git 钩子管理
- **[lint-staged](https://github.com/okonet/lint-staged)** - 暂存文件检查
- **[Commitlint](https://commitlint.js.org/)** - 提交信息规范

---

## 📂 项目结构

```
portfolio-resume/
├── .husky/                # Git 钩子配置
│   ├── pre-commit        # 提交前运行 lint-staged
│   └── commit-msg        # 验证提交信息格式
├── public/               # 静态资源 (图片、字体等)
├── src/
│   ├── app/             # Next.js App Router 页面
│   │   ├── layout.tsx   # 根布局
│   │   └── page.tsx     # 首页
│   ├── components/      # React 组件 (计划)
│   │   ├── ui/         # 基础 UI 组件
│   │   ├── layout/     # 布局组件
│   │   └── features/   # 业务组件
│   ├── lib/            # 工具函数 (计划)
│   └── styles/         # 全局样式 (计划)
├── .eslintrc.json       # ESLint 配置
├── .prettierrc.json     # Prettier 配置
├── .lintstagedrc.json   # lint-staged 配置
├── commitlint.config.js # Commitlint 配置
├── tailwind.config.ts   # Tailwind 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 项目依赖和脚本
```

---

## 🛠️ 开发指南

### 环境要求

- **Node.js**: >= 20.9.0 (推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理)
- **npm**: >= 10.0.0

> ⚠️ 当前使用 Node.js v18，可能会有兼容性警告，建议升级到 v20+

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看开发环境。

### 常用命令

| 命令                   | 说明                        |
| ---------------------- | --------------------------- |
| `npm run dev`          | 启动开发服务器              |
| `npm run build`        | 构建生产环境代码            |
| `npm run start`        | 启动生产服务器 (需先 build) |
| `npm run lint`         | 运行 ESLint 检查            |
| `npm run lint:fix`     | 自动修复 ESLint 问题        |
| `npm run format`       | 格式化所有代码 (Prettier)   |
| `npm run format:check` | 检查代码格式 (不修改)       |
| `npm run type-check`   | TypeScript 类型检查         |

---

## 📝 代码规范

### Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，格式如下：

```
<type>(<scope>): <subject>

[可选的正文]

[可选的脚注]
```

**类型 (type)**

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式 (不影响功能)
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具变动

**示例**

```bash
git commit -m "feat(auth): 添加用户登录功能"
git commit -m "fix(ui): 修复移动端导航栏样式问题"
git commit -m "docs(readme): 更新安装说明"
```

> ✨ **自动化检查**: 提交时会自动运行 `lint-staged` 和 `commitlint`，不符合规范的代码或提交信息会被拒绝。

### 代码格式化

- 使用 **Prettier** 进行自动格式化
- 保存文件时建议配置编辑器自动格式化
- 提交前会自动格式化暂存文件

---

## 🎯 项目特色

### 1. 严格的类型安全

- 全量 TypeScript，严格模式开启
- 避免使用 `any` 类型
- Prisma 提供数据库层面的类型安全

### 2. 移动端优先

- 采用 Mobile-first 设计理念
- 响应式布局适配所有设备
- 触摸友好的交互设计

### 3. 高性能优化

- 利用 Next.js 的 SSR/SSG 能力
- 图片懒加载和优化
- 代码分割和按需加载

### 4. 工程化最佳实践

- Git 钩子自动化质量检查
- 统一的代码风格和提交规范
- 清晰的目录结构和文件组织

---

## 🚧 开发路线

- [x] 项目初始化 (Next.js + TypeScript + Tailwind)
- [x] 配置代码质量工具 (ESLint, Prettier, Husky)
- [ ] 集成 Shadcn/UI 组件库
- [ ] 配置 MongoDB + Prisma
- [ ] 实现核心页面布局
- [ ] 开发访客留言板功能
- [ ] 集成 Framer Motion 动画
- [ ] 性能优化和 SEO
- [ ] 部署到 Vercel

---

## 📄 License

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

---

## 👨‍💻 作者

**周恩隽 (Zhou Enjun)**

- 7年前端开发经验
- 技术栈: React / Vue / Node.js / TypeScript
- 目标职位: 高级前端工程师 / 前端技术专家

---

<div align="center">

**⭐ 如果这个项目对你有帮助，欢迎 Star！**

Made with ❤️ and ☕

</div>
