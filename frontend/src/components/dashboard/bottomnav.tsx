"use client"

import Link from "next/link"

interface NavItem {
  name: string
  icon: any
  href: string
}

interface BottomNavProps {
  navItems: NavItem[]
}

export default function BottomNav({ navItems }: BottomNavProps) {

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 border-t bg-white z-40">

      <div className="grid grid-cols-5 h-16">

        {navItems.slice(0,5).map((item, i) => {
          const Icon = item.icon

          return (
            <Link
              key={i}
              href={item.href}
              className="flex flex-col items-center justify-center text-gray-600 hover:text-black"
            >

              <Icon size={20} />

              <span className="text-[11px] mt-1">
                {item.name}
              </span>

            </Link>
          )
        })}

      </div>

    </nav>
  )
}