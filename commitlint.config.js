/**
 * Commitlint 配置文件
 *
 * 用于规范 Git 提交信息格式，确保团队代码提交的一致性
 *
 * 提交格式规范：
 * <type>(<scope>): <subject>
 *
 * 示例：
 * feat(auth): 添加用户登录功能
 * fix(ui): 修复移动端按钮样式问题
 * docs(readme): 更新安装说明
 *
 * 允许的类型 (type)：
 * - feat: 新功能
 * - fix: 修复 bug
 * - docs: 文档变更
 * - style: 代码格式（不影响功能，如空格、分号等）
 * - refactor: 重构（既不是新增功能，也不是修复 bug）
 * - perf: 性能优化
 * - test: 增加测试
 * - chore: 构建过程或辅助工具的变动
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
