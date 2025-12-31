import './globals.css'
import Providers from '../components/Providers'

export const metadata = {
  title: 'Eterna Pulse - Dev',
  description: 'Token discovery table replica'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
