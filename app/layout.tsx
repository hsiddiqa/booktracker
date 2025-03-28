import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Book Tracker',
  description: 'This is a simple book tracking application that should allow the user to keep track of all the books that has been read',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
