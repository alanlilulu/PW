# 🎨 统一设计系统指南

## 📋 概述

本设计系统旨在为整个网站提供统一、一致的设计语言，确保用户体验的连贯性和专业性。

## 🎯 设计原则

### 1. 一致性 (Consistency)
- 所有组件使用相同的设计语言
- 统一的颜色、字体、间距和圆角
- 一致的交互模式和动画效果

### 2. 简洁性 (Simplicity)
- 清晰的信息层级
- 减少视觉噪音
- 专注于内容本身

### 3. 可访问性 (Accessibility)
- 符合WCAG 2.1标准
- 良好的对比度
- 键盘导航支持

### 4. 响应式 (Responsive)
- 移动优先设计
- 灵活的布局系统
- 适配各种屏幕尺寸

## 🎨 色彩系统

### 主色调
```css
--color-primary-500: #3b82f6  /* 主要操作按钮 */
--color-primary-600: #2563eb  /* 悬停状态 */
--color-primary-700: #1d4ed8  /* 激活状态 */
```

### 中性色
```css
--color-gray-50: #f9fafb   /* 背景色 */
--color-gray-100: #f3f4f6 /* 次要背景 */
--color-gray-500: #6b7280 /* 次要文字 */
--color-gray-900: #111827 /* 主要文字 */
```

### 语义色
```css
--color-success: #10b981  /* 成功状态 */
--color-warning: #f59e0b  /* 警告状态 */
--color-error: #ef4444    /* 错误状态 */
```

## 📝 字体系统

### 字体层级
```css
--text-xs: 0.75rem    /* 12px - 辅助信息 */
--text-sm: 0.875rem   /* 14px - 小标题 */
--text-base: 1rem     /* 16px - 正文 */
--text-lg: 1.125rem   /* 18px - 大标题 */
--text-xl: 1.25rem    /* 20px - 页面标题 */
--text-2xl: 1.5rem    /* 24px - 区块标题 */
--text-3xl: 1.875rem  /* 30px - 主标题 */
--text-4xl: 2.25rem   /* 36px - 页面主标题 */
--text-5xl: 3rem      /* 48px - 英雄标题 */
```

### 字重
```css
--font-light: 300     /* 轻量 */
--font-normal: 400    /* 常规 */
--font-medium: 500    /* 中等 */
--font-semibold: 600  /* 半粗 */
--font-bold: 700      /* 粗体 */
```

## 📏 间距系统

### 基础间距
```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem     /* 8px */
--space-4: 1rem       /* 16px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
--space-20: 5rem      /* 80px */
```

## 🔄 圆角系统

```css
--radius-sm: 0.125rem  /* 2px - 小元素 */
--radius-base: 0.25rem /* 4px - 输入框 */
--radius-md: 0.375rem  /* 6px - 按钮 */
--radius-lg: 0.5rem    /* 8px - 卡片 */
--radius-xl: 0.75rem   /* 12px - 大卡片 */
--radius-2xl: 1rem    /* 16px - 模态框 */
--radius-full: 9999px /* 圆形 */
```

## 🌟 阴影系统

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)           /* 轻微阴影 */
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1)          /* 基础阴影 */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)         /* 中等阴影 */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)       /* 大阴影 */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)      /* 超大阴影 */
```

## ⚡ 动画系统

### 持续时间
```css
--duration-fast: 150ms    /* 快速交互 */
--duration-normal: 300ms /* 标准过渡 */
--duration-slow: 500ms   /* 慢速动画 */
```

### 缓动函数
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1)      /* 加速 */
--ease-out: cubic-bezier(0, 0, 0.2, 1)     /* 减速 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) /* 先加速后减速 */
```

## 🧩 组件系统

### UnifiedButton
统一的按钮组件，支持多种变体和尺寸。

```tsx
<UnifiedButton
  variant="primary"     // primary | secondary | ghost | outline
  size="md"            // sm | md | lg
  loading={false}      // 加载状态
  icon={<Icon />}      // 图标
  iconPosition="right" // left | right
  fullWidth={false}    // 全宽
>
  按钮文字
</UnifiedButton>
```

### UnifiedCard
统一的卡片组件，支持多种样式。

```tsx
<UnifiedCard
  variant="default"    // default | elevated | outlined | glass
  padding="md"         // none | sm | md | lg
  hover={true}         // 悬停效果
  onClick={handler}    // 点击事件
>
  卡片内容
</UnifiedCard>
```

### UnifiedInput
统一的输入框组件，支持多种变体。

```tsx
<UnifiedInput
  label="标签"
  error="错误信息"
  helperText="帮助文字"
  variant="default"    // default | filled | outlined
  size="md"           // sm | md | lg
  icon={<Icon />}     // 图标
  iconPosition="left" // left | right
/>
```

## 📱 响应式断点

```css
--breakpoint-sm: 640px   /* 小屏幕 */
--breakpoint-md: 768px   /* 中等屏幕 */
--breakpoint-lg: 1024px  /* 大屏幕 */
--breakpoint-xl: 1280px  /* 超大屏幕 */
--breakpoint-2xl: 1536px /* 超超大屏幕 */
```

## 🎯 使用指南

### 1. 优先使用设计系统组件
- 使用 `UnifiedButton` 而不是自定义按钮
- 使用 `UnifiedCard` 而不是自定义卡片
- 使用 `UnifiedInput` 而不是自定义输入框

### 2. 遵循间距规范
- 使用预定义的间距值
- 保持一致的间距比例
- 避免使用任意数值

### 3. 保持颜色一致性
- 使用预定义的颜色变量
- 避免硬编码颜色值
- 确保良好的对比度

### 4. 统一动画效果
- 使用预定义的动画持续时间
- 保持一致的缓动函数
- 避免过度动画

## 🔧 自定义扩展

如需扩展设计系统，请：

1. 在 `design-system.css` 中添加新的CSS变量
2. 在 `tailwind.config.js` 中扩展配置
3. 创建新的统一组件
4. 更新此文档

## 📚 相关文件

- `src/styles/design-system.css` - 设计系统CSS
- `tailwind.config.js` - Tailwind配置
- `src/components/ui/UnifiedButton.tsx` - 统一按钮组件
- `src/components/ui/UnifiedCard.tsx` - 统一卡片组件
- `src/components/ui/UnifiedInput.tsx` - 统一输入框组件
