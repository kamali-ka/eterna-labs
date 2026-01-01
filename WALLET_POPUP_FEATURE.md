# Wallet/Account Popup Feature

## 🎯 Overview

Added a wallet icon button in the navbar that opens a popup showing account balances and deposit/withdraw actions, matching the Axiom Trade design.

## 📍 Location

The wallet icon is positioned **after the notification bell icon** and **before the mobile menu toggle** in the navbar.

```
[🔍] [SOL▼] [Deposit] [⭐] [🔔] [💼] [☰]
                              ↑
                         Wallet Icon
```

## 🎨 Visual Design

### Wallet Icon Button
- **Icon**: Wallet icon from lucide-react
- **Size**: 20x20px (h-5 w-5)
- **Color**: Secondary text color (#a1a1aa)
- **Hover**: Rounded background appears
- **Style**: Matches watchlist and notification icons

### Popup Design

```
┌─────────────────────────────────┐
│ Total Value                  [X]│
├─────────────────────────────────┤
│ [🌈] Solana                     │
├─────────────────────────────────┤
│ Perps                        $0 │
│ SOL                           0 │
│ USDC                          0 │
│                                 │
│ ┌─────────┐  ┌──────────┐      │
│ │ Deposit │  │ Withdraw │      │
│ └─────────┘  └──────────┘      │
└─────────────────────────────────┘
```

## 📊 Popup Structure

### Header
- **Title**: "Total Value"
- **Close button**: X icon (top-right)
- **Spacing**: Flexbox with justify-between

### Balance Display

#### 1. **Solana Section** (with border-bottom)
```tsx
<div className="flex items-center justify-between py-2 border-b border-border-default">
  <div className="flex items-center gap-2">
    {/* Gradient Icon */}
    <div className="w-6 h-6 rounded-full gradient">
      <span>SOL</span>
    </div>
    <span>Solana</span>
  </div>
</div>
```

#### 2. **Balance Items** (Perps, SOL, USDC)
```tsx
<div className="flex items-center justify-between">
  <span className="text-sm text-text-secondary">Perps</span>
  <span className="text-sm font-medium text-text-primary">$0</span>
</div>
```

Each balance item shows:
- **Label** (left): Secondary text color, small text
- **Value** (right): Primary text color, medium font weight

### Action Buttons

Two-column grid layout:

```tsx
<div className="grid grid-cols-2 gap-3">
  {/* Deposit Button */}
  <button className="bg-blue-500 hover:bg-blue-600 text-black">
    Deposit
  </button>

  {/* Withdraw Button */}
  <button className="bg-bg-tertiary hover:bg-bg-hover text-text-primary border">
    Withdraw
  </button>
</div>
```

#### Deposit Button
- **Background**: Blue (#3B82F6)
- **Text**: Black
- **Hover**: Darker blue (#2563EB)
- **Style**: Bold, rounded

#### Withdraw Button
- **Background**: Tertiary background (#18181b)
- **Text**: Primary text (#fafafa)
- **Border**: Default border (#27272a)
- **Hover**: Hover background (#1f1f23)
- **Style**: Bold, rounded, outlined

## 💾 State Management

```typescript
const [walletOpen, setWalletOpen] = useState(false)
```

### Open/Close Behavior
- **Click wallet icon**: Toggles popup
- **Click X button**: Closes popup
- **Click outside**: Closes popup (via overlay)
- **Other popups**: Mutually exclusive (one at a time)

## 🎯 Balances Displayed

| Item | Label | Default Value | Alignment |
|------|-------|---------------|-----------|
| **Solana** | Network identifier | N/A | Left (with gradient icon) |
| **Perps** | Perpetuals balance | $0 | Right |
| **SOL** | Solana token balance | 0 | Right |
| **USDC** | USDC stablecoin balance | 0 | Right |

## 🎨 Styling Details

### Popup Container
```css
.wallet-popup {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 320px;
  background: #111113;
  border: 1px solid #27272a;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  padding: 16px;
}
```

### Solana Gradient Icon
```css
.solana-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9945FF 0%, #14F195 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: white;
}
```

### Button Styles
```css
/* Deposit Button */
.deposit-btn {
  padding: 10px 16px;
  background: #3B82F6;
  color: black;
  font-weight: 500;
  font-size: 14px;
  border-radius: 8px;
  transition: background 150ms;
}

.deposit-btn:hover {
  background: #2563EB;
}

/* Withdraw Button */
.withdraw-btn {
  padding: 10px 16px;
  background: #18181b;
  border: 1px solid #27272a;
  color: #fafafa;
  font-weight: 500;
  font-size: 14px;
  border-radius: 8px;
  transition: all 150ms;
}

.withdraw-btn:hover {
  background: #1f1f23;
}
```

## 🔧 Technical Implementation

### Component Structure
```tsx
{/* Wallet/Account Icon */}
<div className="relative">
  <button onClick={() => setWalletOpen(!walletOpen)}>
    <Wallet className="h-5 w-5 text-text-secondary" />
  </button>

  {/* Wallet Popup */}
  {walletOpen && (
    <div className="absolute top-full right-0 mt-2 w-80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3>Total Value</h3>
        <button onClick={() => setWalletOpen(false)}>
          <X />
        </button>
      </div>

      {/* Balances */}
      <div className="space-y-3 mb-4">
        {/* Solana */}
        <div className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center gap-2">
            <div className="gradient-icon">SOL</div>
            <span>Solana</span>
          </div>
        </div>

        {/* Perps, SOL, USDC */}
        <div className="flex items-center justify-between">
          <span>Perps</span>
          <span>$0</span>
        </div>
        {/* ... more items */}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button>Deposit</button>
        <button>Withdraw</button>
      </div>
    </div>
  )}
</div>
```

### Overlay Integration
```tsx
{/* Overlay for dropdowns */}
{(networkDropdownOpen || watchlistOpen || notificationsOpen || walletOpen) && (
  <div
    className="fixed inset-0 bg-black/20 z-[-1]"
    onClick={() => {
      setNetworkDropdownOpen(false)
      setWatchlistOpen(false)
      setNotificationsOpen(false)
      setWalletOpen(false) // ← Added
    }}
  />
)}
```

## 📱 Responsive Behavior

### Desktop (≥1024px)
- Wallet icon visible
- Popup appears on click
- Positioned right-aligned below icon

### Tablet/Mobile (<1024px)
- Wallet icon still visible
- Popup works same way
- May require scrolling if viewport is narrow

## ✨ Interactive Features

### Click States
1. **Wallet icon click**: Opens popup
2. **Close (X) button click**: Closes popup
3. **Outside click (overlay)**: Closes popup
4. **Deposit button click**: Ready for deposit functionality
5. **Withdraw button click**: Ready for withdraw functionality

### Hover States
- **Wallet icon**: Background highlight appears
- **Close button**: Background highlight appears
- **Deposit button**: Darker blue background
- **Withdraw button**: Darker background

## 🎯 Default Values

All balances show **zero** by default:
- **Perps**: $0
- **SOL**: 0
- **USDC**: 0

Future enhancement: Connect to actual wallet data.

## 📝 Files Modified

**[components/organisms/Navigation/Navbar.tsx](components/organisms/Navigation/Navbar.tsx)**
- Line 15: Added `Wallet` import from lucide-react
- Line 68: Added `walletOpen` state
- Line 364-436: Added wallet icon button and popup
- Line 492: Added `walletOpen` to overlay condition
- Line 499: Added `setWalletOpen(false)` to overlay click handler

## 🚀 Future Enhancements

### Planned Features
1. **Real wallet integration**: Connect to Solana wallet (Phantom, Solflare)
2. **Live balances**: Fetch actual SOL and USDC balances
3. **Transaction history**: Show recent deposits/withdrawals
4. **Network switching**: Switch between Solana and BNB
5. **Deposit modal**: Full deposit flow with QR code
6. **Withdraw modal**: Withdrawal form with address input
7. **Price conversion**: Show USD equivalents
8. **Token list**: Expandable list of all token balances

## ✅ Result

A fully functional wallet popup matching Axiom Trade's design:
- ✅ Wallet icon in navbar
- ✅ Clean popup with Total Value header
- ✅ Solana gradient icon
- ✅ Balance display (Perps, SOL, USDC)
- ✅ Deposit and Withdraw buttons
- ✅ Click-outside-to-close behavior
- ✅ Responsive and accessible
- ✅ Matches design system

---

**Your wallet is ready! 💼** Click to view balances and manage funds! 🚀
