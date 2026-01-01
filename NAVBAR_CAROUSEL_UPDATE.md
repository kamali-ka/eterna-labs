# Navigation Bar Carousel & Search Icon Update

## 🔄 Changes Made

### 1. **Horizontal Scroll Carousel for Navigation Items**

The navigation items now use a horizontal scrolling carousel instead of displaying all items inline, preventing overflow issues.

#### Features:
- **Smooth scrolling** - Navigation items scroll horizontally
- **Left/Right arrows** - Appear when content overflows
- **Hidden scrollbar** - Clean, minimal appearance
- **Auto-detect overflow** - Arrows only show when needed
- **Responsive behavior** - Works on all screen sizes

#### Implementation:
```typescript
// Scrollable container with hidden scrollbar
<div
  ref={scrollContainerRef}
  onScroll={checkScroll}
  className="flex items-center gap-1 overflow-x-auto scrollbar-hide scroll-smooth px-8"
>
  {navItems.map((item) => (
    <Link className="shrink-0 whitespace-nowrap">
      {item.label}
    </Link>
  ))}
</div>

// Scroll arrows
{showLeftArrow && (
  <button onClick={() => scroll('left')}>
    <ChevronLeft />
  </button>
)}

{showRightArrow && (
  <button onClick={() => scroll('right')}>
    <ChevronRight />
  </button>
)}
```

#### Arrow Behavior:
- **Left arrow** - Shows when scrolled right (can scroll back left)
- **Right arrow** - Shows when content extends beyond viewport (can scroll right)
- **Auto-update** - Arrows appear/disappear based on scroll position
- **Window resize** - Recalculates on window resize

### 2. **Search Icon Instead of Search Bar**

Replaced the full search bar with a search icon that opens a modal.

#### Before:
```jsx
<div className="flex items-center bg-bg-tertiary border rounded-lg px-3 py-2 w-64">
  <Search className="h-4 w-4" />
  <input type="text" placeholder="Search by token or CA..." />
</div>
```

#### After:
```jsx
{/* Search Icon Button */}
<button onClick={() => setSearchOpen(true)}>
  <Search className="h-5 w-5" />
</button>

{/* Search Modal */}
{searchOpen && (
  <div className="fixed inset-0 bg-black/50 z-[100]">
    <div className="bg-bg-secondary border rounded-lg w-full max-w-2xl">
      <div className="flex items-center px-4 py-3">
        <Search className="h-5 w-5 mr-3" />
        <input
          type="text"
          placeholder="Search by token or CA..."
          autoFocus
        />
        <button onClick={() => setSearchOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
)}
```

#### Modal Features:
- **Full-screen overlay** - Dark backdrop (50% opacity)
- **Centered modal** - Max width 2xl (672px)
- **Auto-focus** - Input automatically focused when opened
- **Close button** - X icon in top-right
- **Click outside** - Closes when clicking overlay
- **ESC key** - Can be enhanced to close on ESC (future)

### 3. **Fixed Page Overflow**

Updated the Pulse page to prevent horizontal overflow:

#### Changes:
```typescript
// Main container
<main className="min-h-screen bg-bg-primary pt-4 overflow-x-hidden">
  <div className="w-full max-w-full px-2 sm:px-4 py-6">

    {/* Three columns - responsive */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
      {/* Columns */}
    </div>
  </div>
</main>
```

#### Responsive Grid:
- **Mobile (<1024px)**: Single column (stacked)
- **Desktop (≥1024px)**: Three columns (side-by-side)
- **Smaller gaps on mobile**: 12px gap on mobile, 16px on desktop
- **Reduced padding**: 8px on mobile, 16px on desktop

### 4. **Removed Mobile Search Bar**

The mobile menu no longer shows the search bar - users click the search icon to open the modal instead.

#### Before:
```jsx
{mobileMenuOpen && (
  <div>
    {/* Mobile Search Bar */}
    <div className="mb-4 md:hidden">
      <input placeholder="Search by token or CA..." />
    </div>

    {/* Navigation Items */}
  </div>
)}
```

#### After:
```jsx
{mobileMenuOpen && (
  <div>
    {/* Navigation Items (no search bar) */}
  </div>
)}
```

## 🎨 Visual Design

### Carousel Scroll Arrows

```
┌─────────────────────────────────────────────┐
│ [<] [Discover] [Pulse] [Trackers] ... [>]  │
└─────────────────────────────────────────────┘
     ↑                                    ↑
  Left Arrow                         Right Arrow
  (when scrolled)                  (when overflow)
```

### Search Modal

```
┌─────────────────────────────────────────────┐
│                  Overlay                    │
│  ┌────────────────────────────────────┐     │
│  │  🔍 [Search by token or CA...]  [X] │     │
│  │                                    │     │
│  │  Start typing to search...         │     │
│  │                                    │     │
│  └────────────────────────────────────┘     │
└─────────────────────────────────────────────┘
```

## 🎯 CSS Utilities Added

```css
/* Hide scrollbar for carousel */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

## 📱 Responsive Behavior

### Desktop (≥1024px)
- Logo + horizontal scrolling navigation carousel
- Search icon (opens modal)
- Network dropdown
- Deposit button
- Watchlist icon
- Notifications icon

### Tablet (768px - 1023px)
- Logo + hamburger menu
- Search icon (opens modal)
- Network dropdown
- Watchlist icon
- Notifications icon
- Hamburger opens full menu

### Mobile (<768px)
- Logo (text hidden <640px)
- Search icon
- Network icon only (no text)
- Watchlist icon
- Notifications icon
- Hamburger menu

## 🔧 Technical Implementation

### State Management

```typescript
const [searchOpen, setSearchOpen] = useState(false)
const [showLeftArrow, setShowLeftArrow] = useState(false)
const [showRightArrow, setShowRightArrow] = useState(false)
const scrollContainerRef = useRef<HTMLDivElement>(null)
```

### Scroll Detection

```typescript
const checkScroll = () => {
  if (scrollContainerRef.current) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }
}

useEffect(() => {
  checkScroll()
  window.addEventListener('resize', checkScroll)
  return () => window.removeEventListener('resize', checkScroll)
}, [])
```

### Scroll Function

```typescript
const scroll = (direction: 'left' | 'right') => {
  if (scrollContainerRef.current) {
    const scrollAmount = 200
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}
```

## ✅ Benefits

### 1. **No Overflow**
- Navigation never causes horizontal scroll
- Works on all screen sizes
- Clean, professional appearance

### 2. **Better Mobile UX**
- Less clutter in navbar
- Modal provides focused search experience
- Larger touch targets

### 3. **Scalable**
- Can add more navigation items without breaking layout
- Carousel automatically handles overflow
- Arrows provide visual affordance

### 4. **Performance**
- Smooth CSS scroll
- No JavaScript animation loops
- Minimal re-renders

## 📝 Files Modified

1. **[components/organisms/Navigation/Navbar.tsx](components/organisms/Navigation/Navbar.tsx)**
   - Added carousel scrolling logic
   - Added search modal
   - Removed inline search bar
   - Added scroll arrows

2. **[styles/globals.css](styles/globals.css:83-92)**
   - Added `.scrollbar-hide` utility class

3. **[app/pulse/page.tsx](app/pulse/page.tsx:242-243,414)**
   - Added `overflow-x-hidden` to main
   - Changed padding to responsive
   - Changed grid to responsive (1 col mobile, 3 col desktop)

## 🚀 Result

A fully responsive, overflow-free navigation bar with:
- ✅ Horizontal scrolling carousel for nav items
- ✅ Left/right scroll arrows when needed
- ✅ Search icon that opens modal
- ✅ No horizontal overflow on any screen size
- ✅ Clean, pixel-perfect design matching Axiom Trade

---

**Perfect navigation that scales beautifully!** 🎉
