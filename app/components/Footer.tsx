"use client"

const Footer = () => {
  const today = new Date()
  return <footer className="w-full text-center py-0 bg-teal/75">
    <p className="text-sm mb-0 text-cream/70 font-cormorant">
      Method: Islamic Society of India
    </p>
    <p className="text-sm text-cream/70 font-cormorant">
      COPYRIGHT © {today.getFullYear()} PRAYER TIMES. ALL RIGHTS RESERVED.
    </p>
  </footer>
}

export default Footer
