import '../styles/globals.css'
import Providers from '../components/Providers'

export const metadata = {
  title: 'Eterna Pulse - Token Discovery',
  description: 'Pixel-perfect token discovery table with real-time updates'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
