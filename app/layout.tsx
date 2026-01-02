import '../styles/globals.css'
import Providers from '../components/Providers'
import { Navbar } from '../components/organisms/Navigation/Navbar'
import { SubNavbar } from '../components/organisms/Navigation/SubNavbar'
import { BottomStatusBar } from '../components/organisms/StatusBar/BottomStatusBar'

export const metadata = {
  title: 'Axiom Pulse - Token Discovery',
  description: 'Pixel-perfect token discovery platform inspired by Axiom Trade'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Navbar />
          <SubNavbar />
          {children}
          <BottomStatusBar />
        </Providers>
      </body>
    </html>
  )
}
