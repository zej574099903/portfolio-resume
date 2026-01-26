import {
  LucideIcon,
  Layout,
  Database,
  Globe,
  Smartphone,
  BarChart3,
  ShieldCheck,
  LayoutGrid,
  Sparkles,
  Wallet,
  Bot,
  PenTool,
  Book,
  StickyNote,
} from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  role: string;
  period: string;
  tech: string[];
  company: string;
  type: 'Company' | 'Personal';
  category:
    | 'Architecture'
    | 'Performance'
    | 'Open Source'
    | 'Mobile'
    | 'Visualization'
    | 'Infrastructure';
  metrics: { label: string; value: string }[];
  icon: LucideIcon;
  color: string;
  link?: string; // For personal projects
}

export const PROJECTS: Project[] = [
  // --- Silergy Company Projects ---
  {
    id: 'silergy-erp',
    title: 'Silergy Enterprise ERP',
    description:
      '从0到1构建的企业级 ERP 系统，集成 WMS、CRM、SCM 等12+核心模块。',
    fullDescription:
      '独立负责 Silergytest 数字化基础设施建设。基于 Umi Max + Ant Design Pro 搭建企业级前端架构，实现了包含资产管理(AMS)、客户关系(CRM)、供应链(SCM)及核心的仓储管理(WMS)在内的全套业务系统。项目包含 500+ 页面，通过高度组件化和工程化手段，保证了系统的可维护性与扩展性。',
    role: 'Tech Lead',
    period: '2025',
    tech: ['React 18', 'Umi Max', 'TypeScript', 'Ant Design Pro'],
    company: 'Silergytest',
    type: 'Company',
    category: 'Architecture',
    metrics: [
      { label: 'Modules', value: '12+' },
      { label: 'Pages', value: '500+' },
    ],
    icon: Database,
    color: 'text-blue-600',
  },
  {
    id: 'silergy-pda',
    title: 'Silergy Smart PDA',
    description: '配套 ERP 的移动端作业系统，实现仓库作业无纸化与实时化。',
    fullDescription:
      '为解决仓储作业痛点开发的移动端系统。基于 UniApp 实现跨平台发布，集成 HTML5+ 扫码能力，支持入库、出库、盘点等核心流程。通过本地缓存优化，确保在弱网环境下也能流畅作业。',
    role: 'Lead Developer',
    period: '2025',
    tech: ['UniApp', 'Vue', 'HTML5+', 'uView'],
    company: 'Silergytest',
    type: 'Company',
    category: 'Mobile',
    metrics: [
      { label: 'Efficiency', value: '+80%' },
      { label: 'Platform', value: 'Cross-App' },
    ],
    icon: Smartphone,
    color: 'text-green-600',
  },
  {
    id: 'silergy-bi',
    title: 'Silergy Data Insight BI',
    description: '基于 Canvas 的实时温湿度监测大屏，采用动态避让算法优化展示。',
    fullDescription:
      '专为工厂环境设计的 TV 端可视化大屏。基于 UniApp + Canvas 绘制实时温湿度热力图，内置 WebSocket 心跳重连与数据压缩机制。独创"动态碰撞避让"算法，确保高密度传感器数据在电视大屏上的无遮挡展示。',
    role: 'Lead Developer',
    period: '2025',
    tech: ['UniApp', 'Canvas', 'WebSocket', 'DCloud'],
    company: 'Silergytest',
    type: 'Company',
    category: 'Visualization',
    metrics: [
      { label: 'Latency', value: '<50ms' },
      { label: 'Sensors', value: '200+' },
    ],
    icon: BarChart3,
    color: 'text-purple-600',
  },
  {
    id: 'silergy-ep',
    title: 'Silergy Enterprise Portal',
    description:
      '统一身份认证与应用聚合门户，实现 SSO 单点登录与 RBAC 权限控制。',
    fullDescription:
      '硅力杰企业级应用门户，集成了内部所有业务系统的统一入口。实现了基于 OAuth2 的单点登录(SSO)中心，提供细粒度的 RBAC 权限管理，并标准化了各子系统的接入规范与 UI 风格。',
    role: 'Tech Lead',
    period: '2024',
    tech: ['React', 'OAuth2', 'Ant Design', 'Umi'],
    company: 'Silergytest',
    type: 'Company',
    category: 'Architecture',
    metrics: [
      { label: 'Apps', value: '10+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    icon: LayoutGrid,
    color: 'text-indigo-600',
  },

  // --- Previous Company Projects ---
  {
    id: 'simulation-platform',
    title: '智能驾驶数据仿真平台',
    description: '基于 Micro-Frontend 的大规模仿真系统，支持车辆追踪与回放。',
    fullDescription:
      '智能驾驶多元数据模拟与仿真系统，集成 worlsim 和 logsim 工具。面对巨石应用导致的发布阻塞，主导引入 Qiankun 架构，将仿真地图、数据配置、回放系统拆解为独立子应用。',
    role: 'Frontend Lead',
    period: '2023',
    tech: ['Vue3', 'TypeScript', 'Qiankun', 'ECharts', 'Node.js'],
    company: 'DingSheng',
    type: 'Company',
    category: 'Architecture',
    metrics: [
      { label: 'Build Speed', value: '+50%' },
      { label: 'Bundle Size', value: '-60%' },
    ],
    icon: Database,
    color: 'text-blue-500',
  },
  {
    id: 'qa-trajectory-monitor',
    title: 'QA 轨迹监控平台',
    description: '处理 10万+ 级数据的实时渲染与算法模拟统计平台。',
    fullDescription:
      '智能驾驶轨迹监控与算法模拟统计平台。针对海量轨迹数据的渲染瓶颈，放弃传统 DOM 操作，实施 Virtual List (虚拟列表) 算法，实现 60FPS 流畅滚动。',
    role: 'Senior Developer',
    period: '2022',
    tech: ['React', 'Redux', 'Virtual List', 'WebSocket'],
    company: 'GongBao',
    type: 'Company',
    category: 'Performance',
    metrics: [
      { label: 'Data', value: '100k Rows' },
      { label: 'Load Time', value: '<2s' },
    ],
    icon: BarChart3,
    color: 'text-green-500',
  },
  {
    id: 'overseas-live-class',
    title: '海外直播教学平台',
    description: '专为海外师生设计的高清音视频互动平台，覆盖全球节点。',
    fullDescription:
      '专为海外师生设计的高清音视频直播互动平台。采用 Composition API 重构，使用动态路由实现精细化权限控制，通过 Vite 拆包优化，使包体积减小 60%。',
    role: 'Core Developer',
    period: '2024',
    tech: ['Vue3', 'Video.js', 'WebRTC', 'Vite'],
    company: 'DingSheng',
    type: 'Company',
    category: 'Architecture',
    metrics: [
      { label: 'Size', value: '-60%' },
      { label: 'Latency', value: 'Low' },
    ],
    icon: Globe,
    color: 'text-purple-500',
  },
  {
    id: 'urban-visualization',
    title: '城乡一体化可视化大屏',
    description: '政府端实时公交客流监控大屏，支持动态水印与自适应布局。',
    fullDescription:
      '政府端公交线路与客流数据实时监控大屏。基于 DataV 实现响应式布局，保证大屏在各种尺寸下完美适配。集成 Canvas 动态水印技术保护敏感数据。',
    role: 'Developer',
    period: '2021',
    tech: ['Vue2', 'DataV', 'Canvas', 'WebSocket'],
    company: 'GongBao',
    type: 'Company',
    category: 'Visualization',
    metrics: [
      { label: 'Update', value: 'ms-level' },
      { label: 'Safety', value: 'Watermark' },
    ],
    icon: Layout,
    color: 'text-orange-500',
  },
  {
    id: 'property-saas',
    title: '智物狗后台管理系统',
    description: '一站式物业SaaS平台，支持大文件切片上传与断点续传。',
    fullDescription:
      '物业、缴费、报修一站式物业服务后台。攻克了大文件切片上传、秒传及断点续传等技术难题，并定制 v-permission 指令实现细粒度的权限控制。',
    role: 'Full Stack',
    period: '2020',
    tech: ['Vue2', 'ElementUI', 'Node.js', 'Excel'],
    company: 'GongBao',
    type: 'Company',
    category: 'Architecture',
    metrics: [
      { label: 'Upload', value: 'Resumable' },
      { label: 'Auth', value: 'RBAC' },
    ],
    icon: ShieldCheck,
    color: 'text-indigo-500',
  },
  {
    id: 'hello-neighbor',
    title: '哈喽邻居小程序',
    description: '集社交与商城于一体的社区服务平台，高交互移动端体验。',
    fullDescription:
      '集社区社交与商城购物于一体的小程序。负责全流程开发，实现高交互的社区动态流与商品推荐模块，优化各种机型的兼容性。',
    role: 'Mobile Lead',
    period: '2019',
    tech: ['Uniapp', 'Vant', 'WeChat', 'Swiper'],
    company: 'KaiNai',
    type: 'Company',
    category: 'Mobile',
    metrics: [
      { label: 'Platform', value: 'Cross-App' },
      { label: 'UX', value: 'Native-like' },
    ],
    icon: Smartphone,
    color: 'text-pink-500',
  },

  // --- Personal Projects ---
  {
    id: 'story-craft',
    title: 'StoryCraft - 魔法绘本',
    description: 'AI 驱动的儿童互动绘本生成器，集成语音朗读与 3D 翻页效果。',
    fullDescription:
      '专为儿童设计的 AI 绘本创作平台。基于 Next.js 16 + MongoDB 构建，集成智谱 GLM-4 生成故事，Pollinations.ai 实时绘制插画。内置 TTS 语音朗读与 Turn.js 3D 翻页效果，为孩子提供沉浸式的阅读体验。',
    role: 'Product Creator',
    period: '2024',
    tech: ['Next.js 16', 'ZhipuAI', 'MongoDB', 'NextAuth'],
    company: 'Personal',
    type: 'Personal',
    category: 'Architecture',
    metrics: [
      { label: 'AI', value: 'Multi-Model' },
      { label: 'UX', value: 'Immersive' },
    ],
    icon: PenTool,
    color: 'text-purple-500',
    // link: 'https://story-craft-demo.vercel.app',
  },
  {
    id: 'note-pwa',
    title: 'AI Smart Notes PWA',
    description: '支持离线访问的智能笔记应用，集成 OpenAI 辅助写作。',
    fullDescription:
      '探索 PWA (Progressive Web App) 极限的笔记应用。具备完整的离线读写能力，通过 Service Worker 缓存策略实现秒开。内置 OpenAI 助手，可对笔记内容进行润色、扩写与摘要生成。',
    role: 'Full Stack',
    period: '2024',
    tech: ['Next.js', 'PWA', 'OpenAI', 'IndexedDB'],
    company: 'Personal',
    type: 'Personal',
    category: 'Architecture',
    metrics: [
      { label: 'Access', value: 'Offline' },
      { label: 'AI', value: 'Assistant' },
    ],
    icon: StickyNote,
    color: 'text-yellow-500',
    // link: 'https://note-pwa-demo.vercel.app',
  },
  {
    id: 'the-mouth-app',
    title: 'The Mouth - 嘴替',
    description: 'React Native 开发的 AI 社交辅助 App，内置多种人格面具。',
    fullDescription:
      '基于 React Native (Expo) 开发的移动端 AI 社交助手。针对"社恐"人群设计，提供多种人格面具（高情商、幽默、反击等）。UI 高度仿原生 iOS 风格，通过 WebSocket 实时连接 AI 生成回复，支持一键复制与历史记录。',
    role: 'Mobile Dev',
    period: '2024',
    tech: ['React Native', 'Expo', 'WebSocket', 'Reanimated'],
    company: 'Personal',
    type: 'Personal',
    category: 'Mobile',
    metrics: [
      { label: 'Platform', value: 'iOS/Android' },
      { label: 'UI', value: 'Native-like' },
    ],
    icon: Bot,
    color: 'text-indigo-500',
    // link: 'https://apps.apple.com/app/id...',
  },
  {
    id: 'blog',
    title: 'Next.js Fullstack Blog',
    description: '从静态 Markdown 转型为 DB 驱动的全栈博客系统。',
    fullDescription:
      '一个可扩展的技术博客系统。初期采用静态 Markdown 渲染，后期重构为基于 MongoDB 的动态内容系统。设计了混合渲染架构 (Hybrid Rendering)，既保留了静态页面的 SEO 优势，又支持在线 CMS 管理与动态数据更新。',
    role: 'Full Stack',
    period: '2024',
    tech: ['Next.js', 'MongoDB', 'Tailwind', 'MDX'],
    company: 'Personal',
    type: 'Personal',
    category: 'Infrastructure',
    metrics: [
      { label: 'SEO', value: '100%' },
      { label: 'CMS', value: 'Custom' },
    ],
    icon: Book,
    color: 'text-emerald-500',
    // link: 'https://my-blog-demo.vercel.app',
  },
  {
    id: 'emmo',
    title: 'Emmo - AI Emotion Diary',
    description: '基于智谱 AI 的情绪分析日记应用，探索心理健康与大模型的结合。',
    fullDescription:
      'Emmo 是一个结合了 AI 治愈力量的情绪追踪应用。不同于传统日记，它集成了 ZhipuGLM 模型，能对用户的日记进行情感分析，并生成个性化的治愈建议与周报。产品旨在通过 AI 降低心理咨询的门槛，让每个人都能拥有一个 24 小时的"口袋心理咨询师"。',
    role: 'Product Creator',
    period: '2024',
    tech: ['Next.js 16', 'ZhipuAI', 'MongoDB', 'Tailwind'],
    company: 'Personal',
    type: 'Personal',
    category: 'Architecture',
    metrics: [
      { label: 'AI', value: 'GLM-4' },
      { label: 'Stack', value: 'FullStack' },
    ],
    icon: Sparkles,
    color: 'text-pink-500',
    // link: 'https://emmo-demo.vercel.app',
  },
  {
    id: 'expense-tracker',
    title: 'Smart Expense Tracker',
    description:
      '全栈财务管理应用，探索 Next.js 16 Server Actions 与 MongoDB 集成。',
    fullDescription:
      '一个现代化的个人财务管理工具。技术上深度实践了 Next.js 16 的最新特性，移除传统的 API Route 层，通过 Server Actions 直接与 MongoDB 交互，大幅简化了全栈开发链路。产品上实现了多账户管理、预算预警及可视化报表功能。',
    role: 'Full Stack',
    period: '2024',
    tech: ['Next.js 16', 'Server Actions', 'MongoDB', 'NextAuth'],
    company: 'Personal',
    type: 'Personal',
    category: 'Architecture',
    metrics: [
      { label: 'API', value: '0-Layer' },
      { label: 'Auth', value: 'Secure' },
    ],
    icon: Wallet,
    color: 'text-cyan-600',
    // link: 'https://expense-demo.vercel.app',
  },
];
