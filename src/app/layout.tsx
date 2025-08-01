import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DigiBot101 - AI Assistant',
  description: 'A special AI with voice specifically for personal assistant and DigiMark101 digital marketing agency management',
  keywords: ['AI', 'assistant', 'voice', 'chatbot', 'digital marketing'],
  authors: [{ name: 'ShawnCooper101' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}