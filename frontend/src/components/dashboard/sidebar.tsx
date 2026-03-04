"use client"

import Link from "next/link"

interface NavItem {
  name: string
  icon: any
  href: string
}

interface SidebarProps {
  open: boolean
  navItems: NavItem[]
}

export default function Sidebar({ open, navItems }: SidebarProps) {

  return (
    <aside
      className={`
      hidden sm:block
      fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r z-40 shadow-sm
      transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >

      <nav className="p-6 space-y-3">

        {navItems.map((item, i) => {
          const Icon = item.icon

          return (
            <Link key={i} href={item.href}>

              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">

                <Icon size={18} />

                <span className="text-sm">
                  {item.name}
                </span>

              </div>

            </Link>
          )
        })}

      </nav>

    </aside>
  )
}