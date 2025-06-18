"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="absolute top-0 w-full z-10">
      <nav className="container mx-auto px-4 py-6">
        <ul className="flex justify-end space-x-8">
          <li>
            <Link
              href="/"
              className={`text-sm uppercase tracking-widest font-cormorant transition-colors ${pathname === "/"
                  ? "text-gold font-bold"
                  : "text-cream/90 hover:text-gold"
                }`}
            >
              Day
            </Link>
          </li>
          <li>
            <Link
              href="/month"
              className={`text-sm uppercase tracking-widest font-cormorant transition-colors ${pathname === "/month"
                  ? "text-gold font-bold"
                  : "text-cream/90 hover:text-gold"
                }`}
            >
              Month
            </Link>
          </li>
          <li>
            <Link
              href="/year"
              className={`text-sm uppercase tracking-widest font-cormorant transition-colors ${pathname === "/year"
                  ? "text-gold font-bold"
                  : "text-cream/90 hover:text-gold"
                }`}
            >
              Year
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
