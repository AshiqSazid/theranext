'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Database, BarChart3, BookOpen, Info, Music } from 'lucide-react'

const navigation = [
  { name: 'User Intake', href: '/', icon: Users },
  { name: 'User Database', href: '/database', icon: Database },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Research Evidence', href: '/research', icon: BookOpen },
  { name: 'About', href: '/about', icon: Info },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#338AFF] to-[#1E6FFF] shadow-xl z-50">
      <div className="flex flex-col h-full p-6 text-[#FDFBF7]">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center mb-8 pt-4">
          <Music className="w-10 h-10 text-[#FDFBF7] mr-2" />
          <h1 className="text-2xl font-bold text-[#FDFBF7]">TheraMuse</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = isActiveRoute(item.href)
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[#FDFBF7] text-[#338AFF] shadow-md'
                    : 'text-[#FDFBF7] hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer Quote */}
        <div className="mt-auto pt-6 border-t border-white/30">
          <blockquote className="text-[#FDFBF7]/90 text-sm italic leading-relaxed">
            <p className="font-semibold mb-2">
              "Where words fail, music speaks — not to the mind, but to the soul."
            </p>
            <footer className="text-[#FDFBF7]/70 text-xs">
              — Hans Christian Andersen
            </footer>
          </blockquote>
        </div>
      </div>
    </aside>
  )
}
