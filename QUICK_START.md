# Quick Start Guide - Eterna Pulse

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000/pulse
```

---

## 📂 Project Overview

This is a **pixel-perfect token discovery table** built with:
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Redux Toolkit (state management)
- Tailwind CSS (styling)
- Radix UI (accessible components)
- React Virtual (performance)

---

## 🎯 Key Features

✅ **Real-time price updates** - Smooth animations when prices change
✅ **Sortable columns** - Click headers to sort
✅ **Virtual scrolling** - Handle 1000s of rows efficiently
✅ **Dark theme** - Professional trading interface
✅ **Type-safe** - Full TypeScript coverage
✅ **Responsive** - Works on all screen sizes

---

## 📁 Important Files

### Pages
- `app/pulse/page.tsx` - Main token discovery page
- `app/layout.tsx` - Root layout with providers

### Components
- `components/organisms/TokenTable/` - Main table component
- `components/molecules/` - Reusable cell components
- `components/atoms/` - Basic UI elements

### State Management
- `store/slices/tokensSlice.ts` - Token data state
- `store/slices/filtersSlice.ts` - Filters and sorting

### Utilities
- `lib/utils.ts` - Helper functions
- `lib/mockData.ts` - Sample token data
- `lib/design-tokens.ts` - Design system values

---

## 🛠️ Common Tasks

### Add a New Component
```tsx
// components/atoms/MyComponent.tsx
'use client'

import { cn } from '@/lib/cn'

interface MyComponentProps {
  className?: string
}

export function MyComponent({ className }: MyComponentProps) {
  return <div className={cn('base-styles', className)}>Content</div>
}
```

### Add a New Redux Action
```typescript
// In store/slices/tokensSlice.ts
reducers: {
  myNewAction: (state, action: PayloadAction<SomeType>) => {
    // Update state here
  }
}
```

### Add a Custom Hook
```typescript
// hooks/useMyHook.ts
'use client'

import { useState, useEffect } from 'react'

export function useMyHook() {
  const [value, setValue] = useState(null)

  useEffect(() => {
    // Hook logic
  }, [])

  return value
}
```

---

## 🎨 Styling Guide

### Use Design Tokens
```tsx
// ✅ Good - Uses design tokens
<div className="bg-bg-primary text-text-primary" />

// ❌ Bad - Hardcoded colors
<div className="bg-black text-white" />
```

### Use cn() for Dynamic Classes
```tsx
import { cn } from '@/lib/cn'

<div className={cn(
  'base-class',
  isActive && 'active-class',
  { 'conditional-class': someCondition }
)} />
```

### Custom Animations
```tsx
// Already defined in Tailwind config
<div className="animate-price-up" />   // Green flash
<div className="animate-price-down" /> // Red flash
<div className="animate-shimmer" />    // Loading shimmer
```

---

## 📊 Data Flow

```
1. Mock WebSocket (mockSocket.ts)
   ↓
2. usePriceUpdates hook
   ↓
3. Redux Action (updateTokenPrice)
   ↓
4. Redux Store Update
   ↓
5. Component Re-render (only affected cells)
   ↓
6. Smooth animation plays
```

---

## 🐛 Troubleshooting

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🔥 Performance Tips

1. **Always memoize components** that receive object/array props
   ```tsx
   export const MyComponent = memo(function MyComponent({ data }) {
     // ...
   })
   ```

2. **Use useMemo for expensive calculations**
   ```tsx
   const sortedData = useMemo(() =>
     data.sort(...),
     [data]
   )
   ```

3. **Use useCallback for event handlers**
   ```tsx
   const handleClick = useCallback(() => {
     // ...
   }, [dependencies])
   ```

4. **Avoid inline objects/arrays**
   ```tsx
   // ❌ Bad
   <Component style={{ color: 'red' }} />

   // ✅ Good
   const style = { color: 'red' }
   <Component style={style} />
   ```

---

## 📚 Learn More

- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Detailed step-by-step guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Complete feature list
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling utilities

---

## 🎉 What's Included

✅ 20 mock tokens with realistic data
✅ Real-time price updates every second
✅ 6 sortable columns
✅ Smooth price change animations
✅ Token status badges
✅ Chain badges (SOL, ETH, BASE, BTC)
✅ Tooltips with contract addresses
✅ Popover menus with token details
✅ Virtual scrolling for performance
✅ Dark theme throughout
✅ Type-safe codebase
✅ Responsive design

---

## 🚢 Next Steps

1. **Test the app** - Visit `/pulse` and interact with the table
2. **Add filters** - Status, chain, price range filters
3. **Add search** - Search by token name or symbol
4. **Enhance UX** - Add more tooltips and interactions
5. **Deploy** - Push to Vercel for production

---

**Need Help?** Check the detailed guides:
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Implementation patterns
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Architecture overview
