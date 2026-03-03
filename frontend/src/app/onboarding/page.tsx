"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

export default function OnboardingPage() {
  const router = useRouter();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    subject: "",
    level: "",
  });

  const next = () => swiper?.slideNext();
  const back = () => swiper?.slidePrev();

  const finish = async () => {
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        credentials: "include", // important for Better Auth cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Onboarding failed:", error);
        alert("Failed to save onboarding data");
        return;
      }

      // After onboarding, go directly based on chosen role.
      const role = formData.role.toLowerCase();
      router.push(role === "teacher" ? "/dashboard/teacher" : "/dashboard/student");
    } catch (err) {
      console.error("Onboarding error:", err);
      alert("Something went wrong");
    }
  };

  const levels = [
    "Primary",
    "Lower Secondary",
    "Upper Secondary",
    "Undergraduate",
    "Postgraduate",
    "Doctoral",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">

      {/* 🔥 Branding */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          <span className="text-violet-600">Is It</span>{" "}
          <span className="text-gray-900">Clear?</span>
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Structured clarity for structured minds.
        </p>
      </div>

      {/* 🧾 Onboarding Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition ${
                i === step ? "bg-violet-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <Swiper
          allowTouchMove={false}
          onSwiper={setSwiper}
          onSlideChange={(s) => setStep(s.activeIndex)}
        >
          {/* Slide 1 - Role */}
          <SwiperSlide>
            <div className="space-y-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Select your role
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() =>
                    setFormData({ ...formData, role: "student" })
                  }
                  className={`p-4 rounded-xl border transition ${
                    formData.role === "student"
                      ? "bg-violet-100 border-violet-400"
                      : "border-gray-300"
                  }`}
                >
                  Student
                </button>

                <button
                  onClick={() =>
                    setFormData({ ...formData, role: "teacher" })
                  }
                  className={`p-4 rounded-xl border transition ${
                    formData.role === "teacher"
                      ? "bg-violet-100 border-violet-400"
                      : "border-gray-300"
                  }`}
                >
                  Teacher
                </button>
              </div>

              <button
                disabled={!formData.role}
                onClick={next}
                className="w-full py-3 bg-violet-600 text-white rounded-xl disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </SwiperSlide>

          {/* Slide 2 - Name */}
          <SwiperSlide>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center text-gray-800">
                What should we call you?
              </h2>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your name"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-400 outline-none"
              />

              <div className="flex justify-between">
                <button onClick={back} className="text-gray-500">
                  Back
                </button>

                <button
                  disabled={!formData.name}
                  onClick={next}
                  className="bg-violet-600 text-white px-4 py-2 rounded-xl disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 - Subject */}
<SwiperSlide>
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-center text-gray-800">
      What subject do you {formData.role === "teacher" ? "teach" : "study"}?
    </h2>

    <input
      type="text"
      value={formData.subject}
      onChange={(e) =>
        setFormData({ ...formData, subject: e.target.value })
      }
      placeholder={
        formData.role === "teacher"
          ? "e.g. Mathematics"
          : "e.g. Computer Science"
      }
      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-400 outline-none"
    />

    <div className="flex justify-between">
      <button onClick={back} className="text-gray-500">
        Back
      </button>

      <button
        disabled={!formData.subject.trim()}
        onClick={next}
        className="bg-violet-600 text-white px-4 py-2 rounded-xl disabled:opacity-40"
      >
        Next
      </button>
    </div>
  </div>
</SwiperSlide>

          {/* Slide 4 - Level */}
          <SwiperSlide>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center text-gray-800">
                Level You Teach / Study
              </h2>

              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full p-3 border rounded-xl"
              >
                <option value="">Select level</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>

              <div className="flex justify-between">
                <button onClick={back} className="text-gray-500">
                  Back
                </button>

                <button
                  disabled={!formData.level}
                  onClick={finish}
                  className="bg-violet-600 text-white px-4 py-2 rounded-xl disabled:opacity-40"
                >
                  Enter Dashboard
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}