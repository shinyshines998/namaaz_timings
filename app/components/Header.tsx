import Link from "next/link"

const Header = () => {
  return (
    <header className="absolute top-0 w-full z-10">
      <nav className="container mx-auto px-4 py-6">
        <ul className="flex justify-end space-x-8">
          <li>
            <Link href="/" className="text-cream/90 hover:text-gold text-sm uppercase tracking-widest font-cormorant">
              Day
            </Link>
          </li>
          <li>
            <Link
              href="/month"
              className="text-cream/90 hover:text-gold text-sm uppercase tracking-widest font-cormorant"
            >
              Month
            </Link>
          </li>
          <li>
            <Link
              href="/year"
              className="text-cream/90 hover:text-gold text-sm uppercase tracking-widest font-cormorant"
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
