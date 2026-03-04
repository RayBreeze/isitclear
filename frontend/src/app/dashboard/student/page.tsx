import GreetingCard from "@/components/dashboard/greetingcard"
import MyClasses from "@/components/dashboard/myclassescard"
import RecentDoubts from "@/components/dashboard/recentdoubt"

export default function StudentDashboard() {
  return (
    <div className="space-y-6">

      <GreetingCard name="John" />
      <MyClasses />
      <RecentDoubts />

      <div>
        Dashboard Content
      </div>

    </div>
  )
}