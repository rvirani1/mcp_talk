import type { Metadata } from 'next'
import { Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import './globals.css'

const spaceGroteskFont = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  description: 'MCP Talk',
  title: 'MCP Talk',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGroteskFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
