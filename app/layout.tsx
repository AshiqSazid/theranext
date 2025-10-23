import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TheraMuse - Music Therapy',
  description: 'Personalized music therapy for cognitive enhancement',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-[rgba(169,197,235,0.15)]">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 bg-gradient-to-br from-[#FDFBF7] to-[#E7F0FF]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
