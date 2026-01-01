# Navigation Bar Implementation - Pixel Perfect Replica

## 🎯 Overview

Pixel-perfect implementation of Axiom Trade's navigation bar with full desktop and mobile responsiveness.

## 📐 Layout Structure (Left to Right)

### Desktop View (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo] [Discover] [Pulse] [Trackers] [Perpetuals] [Yield] [Vision→]        │
│        [Portfolio] [Rewards]                                                 │
│                                           [Search] [SOL▼] [Deposit] [⭐] [🔔] │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Components Breakdown

#### 1. **Logo Section**
- Gradient circular icon (blue to purple)
- "Axiom" text (hidden on small screens)
- Clickable link to homepage

#### 2. **Main Navigation Items**
- **Discover** - Token discovery page
- **Pulse** - Current page (real-time token monitoring)
- **Trackers** - Portfolio tracking
- **Perpetuals** - Trading interface
- **Yield** - Yield farming dashboard
- **Vision** - Analytics (has submenu with right arrow on hover)
  - Submenu items:
    - Analytics
    - Market Insights
    - Trending Data
- **Portfolio** - User portfolio
- **Rewards** - Rewards program

#### 3. **Search Bar**
- Icon: Search icon (magnifying glass)
- Placeholder: "Search by token or CA..."
- Width: 256px (w-64)
- Hidden on mobile (<768px)
- Focus state: Border changes to border-focus color

#### 4. **Network Selector Dropdown**
- Current network badge with colored icon
- Options:
  - **Solana (SOL)** - Green (#14F195)
  - **BNB Chain (BNB)** - Yellow (#F3BA2F)
- Dropdown appears on click
- Shows full name on desktop, icon only on mobile

#### 5. **Deposit Button**
- Background: Blue (#3B82F6)
- Text: Black
- No border
- Hidden on small screens (<640px)
- Hover effect: Darker blue (#2563EB)

#### 6. **Watchlist Icon**
- Star icon inside a circle
- Circle has border
- Click to open popup
- Popup shows:
  - Header: "Watchlist"
  - Close button (X)
  - Empty state: Star icon + message

#### 7. **Notifications Icon**
- Bell icon
- Red dot badge (top-right corner)
- Click to open popup
- Popup shows:
  - Header: "Notifications"
  - Close button (X)
  - Empty state: Bell icon + message

#### 8. **Mobile Menu Toggle**
- Hamburger icon (three lines)
- Only visible on mobile (<1024px)
- Toggles to X when menu is open

### Mobile View (<1024px)

```
┌──────────────────────────────────┐
│ [Logo] [Axiom]    [SOL▼] [⭐] [🔔] [≡] │
└──────────────────────────────────┘

When menu open:
┌──────────────────────────────────┐
│ [Logo] [Axiom]    [SOL▼] [⭐] [🔔] [✕] │
├──────────────────────────────────┤
│ [Search bar]                     │
│                                  │
│ Discover                      >  │
│ Pulse                         >  │
│ Trackers                      >  │
│ Perpetuals                    >  │
│ Yield                         >  │
│ Vision                        >  │
│ Portfolio                     >  │
│ Rewards                       >  │
│                                  │
│ [Deposit Button - Full Width]   │
└──────────────────────────────────┘
```

## 🎨 Styling Details

### Colors
```typescript
// Background
bg-bg-secondary: '#111113'
border-border-default: '#27272a'

// Text
text-text-primary: '#fafafa'
text-text-secondary: '#a1a1aa'
text-text-tertiary: '#71717a'

// Interactions
bg-bg-hover: '#1f1f23'
border-border-focus: '#3f3f46'

// Buttons
Deposit button: bg-blue-500 (#3B82F6)
Deposit hover: bg-blue-600 (#2563EB)

// Networks
Solana: #14F195
BNB: #F3BA2F
```

### Spacing
```css
Navbar height: 64px (h-16)
Horizontal padding:
  - Mobile: 16px (px-4)
  - Desktop: 24px (px-6)

Navigation items gap: 4px (gap-1)
Right section gap: 12px (gap-3)

Search bar width: 256px (w-64)
Network selector: auto width
Icon buttons: 36px circle (w-9 h-9)
```

### Typography
```css
Logo text: text-xl font-bold
Nav items: text-sm font-medium
Search placeholder: text-sm
Button text: text-sm font-medium
Popup headers: text-sm font-semibold
```

### Transitions
```css
All interactive elements: transition-smooth
  - Duration: 150ms
  - Easing: cubic-bezier(0.4, 0, 0.2, 1)

Hover effects:
  - Background color change
  - Text color change
  - Border color change

Submenu:
  - opacity-0 invisible → opacity-100 visible
  - Shown on group-hover
```

## 🔧 Interactive Features

### 1. **Active Navigation State**
- Compares current pathname with nav item href
- Active item has:
  - Primary text color
  - Background highlight (bg-bg-hover)

### 2. **Vision Submenu (Hover)**
- Right arrow (→) appears on hover
- Submenu drops down below parent
- Contains 3 submenu items
- Desktop only (hidden on mobile)

### 3. **Network Dropdown (Click)**
- Click to toggle dropdown
- Shows all available networks
- Each network has colored badge
- Selected network is highlighted
- Click outside to close (overlay)

### 4. **Watchlist Popup (Click)**
- Click star icon to open
- Popup positioned top-right
- Width: 320px (w-80)
- Shows empty state initially
- Close button in header
- Click outside to close

### 5. **Notifications Popup (Click)**
- Click bell icon to open
- Red badge indicator
- Popup positioned top-right
- Width: 320px (w-80)
- Shows empty state initially
- Close button in header
- Click outside to close

### 6. **Mobile Menu**
- Hamburger → X animation
- Slides down navigation items
- Search bar at top (mobile only)
- Full-width deposit button at bottom
- Closes on navigation

## 📱 Responsive Breakpoints

```typescript
// Tailwind breakpoints used
sm: 640px  // Show/hide deposit button text
md: 768px  // Show/hide search bar
lg: 1024px // Show/hide desktop navigation
```

### Visibility Rules

| Element | Mobile (<1024px) | Desktop (≥1024px) |
|---------|------------------|-------------------|
| Logo Text | Hidden <640px | Visible |
| Navigation Items | In hamburger menu | Inline |
| Search Bar | In mobile menu | Always visible |
| Network Name | Hidden <640px | Visible |
| Deposit Button | Full width in menu | Inline button |
| Mobile Menu Toggle | Visible | Hidden |

## 🚀 Technical Implementation

### File Structure
```
components/
  organisms/
    Navigation/
      Navbar.tsx      # Main navbar component
```

### State Management
```typescript
// Local component state
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[0])
const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false)
const [watchlistOpen, setWatchlistOpen] = useState(false)
const [notificationsOpen, setNotificationsOpen] = useState(false)
```

### Key Props & Interfaces
```typescript
interface NavItem {
  label: string
  href: string
  hasSubmenu?: boolean
}

interface Network {
  id: string
  name: string
  icon: string    // Short code (SOL, BNB)
  color: string   // Hex color for badge
}
```

### Router Integration
```typescript
import { usePathname } from 'next/navigation'
const pathname = usePathname()

// Used for active state detection
const isActive = pathname === item.href
```

## 🎯 Pixel-Perfect Details

### 1. **Sticky Positioning**
```css
position: sticky
top: 0
z-index: 50
backdrop-filter: blur(sm)
background-opacity: 95%
```

### 2. **Icon Sizes**
- Navigation icons: h-4 w-4 (16px)
- Search icon: h-4 w-4 (16px)
- Network dropdown chevron: h-4 w-4 (16px)
- Watchlist star: h-4 w-4 in 36px circle
- Notification bell: h-5 w-5 (20px)
- Mobile menu toggle: h-6 w-6 (24px)

### 3. **Border Radius**
- Logo: rounded-lg (8px)
- Buttons: rounded-lg (8px)
- Network badge: rounded-full
- Watchlist circle: rounded-full
- Dropdowns: rounded-lg (8px)

### 4. **Shadow & Elevation**
```css
Dropdowns: shadow-lg
Border: border border-border-default
Backdrop: backdrop-blur-sm
```

### 5. **Network Badges**
```typescript
// Circular colored badges with icon text
<div
  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
  style={{ backgroundColor: network.color }}
>
  <span className="text-black">{network.icon}</span>
</div>
```

## 📋 Implementation Checklist

- [x] Logo with gradient background
- [x] 8 navigation items (Discover through Rewards)
- [x] Vision submenu with right arrow on hover
- [x] Search bar with icon and placeholder
- [x] Network selector dropdown (SOL, BNB)
- [x] Deposit button (blue bg, black text)
- [x] Watchlist icon (star in circle)
- [x] Notifications icon (bell with red badge)
- [x] Mobile menu toggle (hamburger/X)
- [x] Responsive layout (mobile + desktop)
- [x] Active state highlighting
- [x] Hover effects on all interactive elements
- [x] Click-outside-to-close for popups
- [x] Sticky positioning with backdrop blur
- [x] Empty states for watchlist and notifications

## 🔗 Integration

### Layout Integration
```typescript
// app/layout.tsx
import { Navbar } from '../components/organisms/Navigation/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

### Page Adjustment
```typescript
// Add top padding to account for sticky navbar
<main className="min-h-screen bg-bg-primary pt-4">
```

## 📚 Sources

Based on research from:
- [Axiom Trade Navigation Design](https://axiom.co/blog/a-new-look-for-axiom) - "Core navigation bar moved from the left of the screen to the top"
- [Axiom Trade Mobile Support](https://blog.mexc.com/wiki/is-axiom-trade-on-mobile/) - Mobile app mirrors desktop experience
- [Axiom Trading Platform](https://axiom.trade/) - Live platform reference

---

**Result**: A fully responsive, pixel-perfect navigation bar matching Axiom Trade's professional interface! 🚀
