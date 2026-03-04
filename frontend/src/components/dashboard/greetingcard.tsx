"use client"

export default function GreetingCard({ name = "Student" }: { name?: string }) {

  const hour = new Date().getHours()

  let greeting = "Hello"

  if (hour < 12) greeting = "Good Morning"
  else if (hour < 18) greeting = "Good Afternoon"
  else greeting = "Good Evening"

  return (
    <div className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold">
        {greeting}, {name} 
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Ready to clear some doubts today?
      </p>

    </div>
  )
}