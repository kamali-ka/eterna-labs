import '../styles/globals.css'
import Providers from '../components/Providers'
import { Navbar } from '../components/organisms/Navigation/Navbar'
import { SubNavbar } from '../components/organisms/Navigation/SubNavbar'
import { MobileTopBar } from '../components/organisms/Navigation/MobileTopBar'
import { MobileBottomNav } from '../components/organisms/Navigation/MobileBottomNav'
import { BottomStatusBar } from '../components/organisms/StatusBar/BottomStatusBar'
import { InstallWebAppBanner } from '../components/organisms/StatusBar/InstallWebAppBanner'

export const metadata = {
  title: 'Axiom Pulse - Token Discovery',
  description: 'Pixel-perfect token discovery platform inspired by Axiom Trade'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navbar />
            <SubNavbar />
          </div>

          {/* Mobile Navigation */}
          <MobileTopBar />

          {/* Main Content */}
          <main className="pb-16 md:pb-0">
            {children}
          </main>

          {/* Desktop Bottom Status Bar */}
          <div className="hidden md:block">
            <BottomStatusBar />
          </div>

          {/* Mobile Install WebApp Banner */}
          <InstallWebAppBanner />

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  )
}
