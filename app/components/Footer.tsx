"use client"

const Footer = () => {
  const today = new Date()
  return <footer className="w-full text-center py-0">
    <p className="text-sm mb-0 text-black/70 font-cormorant">
      Method: Islamic Society of India
    </p>
    <p className="text-sm text-black/70 font-cormorant">
      COPYRIGHT © {today.getFullYear()} PRAYER TIMES. ALL RIGHTS RESERVED.
    </p>
  </footer>
}

export default Footer
