import '../styles/globals.css'
import Providers from '../components/Providers'
import { Navbar } from '../components/organisms/Navigation/Navbar'

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
          {children}
        </Providers>
      </body>
    </html>
  )
}
