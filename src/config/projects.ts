import {
  LucideIcon,
  Layout,
  Database,
  Globe,
  Smartphone,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  role: string;
  period: string;
  tech: string[];
  category:
    | 'Architecture'
    | 'Performance'
    | 'Open Source'
    | 'Mobile'
    | 'Visualization';
  metrics: { label: string; value: string }[];
  icon: LucideIcon;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'simulation-platform',
    title: '智能驾驶数据仿真平台',
    description: '基于 Micro-Frontend 的大规模仿真系统，支持车辆追踪与回放。',
    fullDescription:
      '智能驾驶多元数据模拟与仿真系统，集成 worlsim 和 logsim 工具。面对巨石应用导致的发布阻塞，主导引入 Qiankun 架构，将仿真地图、数据配置、回放系统拆解为独立子应用。',
    role: 'Frontend Lead',
    period: '2023',
    tech: ['Vue3', 'TypeScript', 'Qiankun', 'ECharts', 'Node.js'],
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
    category: 'Mobile',
    metrics: [
      { label: 'Platform', value: 'Cross-App' },
      { label: 'UX', value: 'Native-like' },
    ],
    icon: Smartphone,
    color: 'text-pink-500',
  },
];
