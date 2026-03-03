import React from "react";

// All auth, onboarding, and role checks are centralized
// in /dashboard (server component) and middleware.
// This page focuses purely on teacher UI.

export default function TeacherDashboard() {
  return (
    <div className="relative bg-white text-slate-800 overflow-hidden">
      <main className="relative z-10">
        <h1 className="text-4xl font-bold mb-6">Teacher Dashboard</h1>
        <p className="text-lg mb-4">
          Welcome to your dashboard! Here you can view your courses,
          assignments, and student progress.
        </p>
        {/* Add more teacher-specific content here */}
      </main>
    </div>
  );
}