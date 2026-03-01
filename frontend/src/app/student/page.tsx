import React from "react";

export default function StudentDashboard() {
  return (
    <div className="relative bg-white text-slate-800 overflow-hidden">
      <main className="relative z-10">
        <h1 className="text-4xl font-bold mb-6">Student Dashboard</h1>
        <p className="text-lg mb-4">Welcome to your dashboard! Here you can view your courses, assignments, and progress.</p>
        {/* Add more student-specific content here */}
      </main>
    </div>
  );
}