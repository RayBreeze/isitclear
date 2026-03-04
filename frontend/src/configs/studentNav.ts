import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Bookmark,
  User
} from "lucide-react"

export const studentNav = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/student" },
  { name: "My Classes", icon: BookOpen, href: "/dashboard/student/classes" },
  { name: "My Doubts", icon: MessageSquare, href: "/dashboard/student/my-doubts" },
  { name: "Bookmarks", icon: Bookmark, href: "/dashboard/student/bookmarks" },
  { name: "Profile", icon: User, href: "/dashboard/student/profile" },
]