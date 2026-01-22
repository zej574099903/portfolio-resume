/**
 * 实用工具函数库
 *
 * 这个文件包含了项目中常用的工具函数
 * 主要用于类名合并、条件类名等场景
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn - 类名合并工具函数
 *
 * 结合 clsx 和 tailwind-merge，用于:
 * 1. 条件性地应用类名
 * 2. 智能合并 Tailwind 类名 (避免冲突)
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-blue-500')
 * cn('px-2', 'px-4') // 结果: 'px-4' (后者覆盖前者)
 *
 * @param inputs - 类名数组或条件表达式
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * formatDate - 日期格式化函数
 *
 * @param date - 日期对象或字符串
 * @param locale - 语言区域 (默认: zh-CN)
 * @returns 格式化后的日期字符串
 *
 * @example
 * formatDate(new Date()) // "2026年1月22日"
 */
export function formatDate(
  date: Date | string,
  locale: string = 'zh-CN'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * sleep - 延迟函数
 *
 * 用于测试或模拟异步操作
 *
 * @param ms - 延迟时间 (毫秒)
 * @returns Promise
 *
 * @example
 * await sleep(1000) // 延迟 1 秒
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * debounce - 防抖函数
 *
 * 在用户停止操作 N 毫秒后才执行函数
 * 常用于搜索框输入、窗口 resize 等场景
 *
 * @param fn - 要防抖的函数
 * @param delay - 延迟时间 (毫秒)
 * @returns 防抖后的函数
 *
 * @example
 * const debouncedSearch = debounce((value: string) => {
 *   console.log('搜索:', value);
 * }, 300);
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * throttle - 节流函数
 *
 * 确保函数在指定时间内最多执行一次
 * 常用于滚动事件、鼠标移动等高频事件
 *
 * @param fn - 要节流的函数
 * @param limit - 时间限制 (毫秒)
 * @returns 节流后的函数
 *
 * @example
 * const throttledScroll = throttle(() => {
 *   console.log('滚动事件');
 * }, 100);
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
