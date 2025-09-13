import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Providers } from '~/components/providers'
import { getServerAuthSession } from '~/lib/auth'
import './globals.css'

export const metadata: Metadata = {
  title: 'Things To Rent - Rent Travel Gear Anytime',
  description: 'The premier platform for renting and listing big-ticket travel items',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerAuthSession()
  
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
