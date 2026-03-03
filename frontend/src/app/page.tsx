import CardNav from "@/components/CardNav";
import DotGrid from "@/components/DotGrid";
import Footer from "@/components/footer";
import TextType from "@/components/TextType";

const items = [
  {
    label: "About",
    bgColor: "#4C1D95",
    textColor: "#fff",
    links: [
      { label: "About Team", ariaLabel: "About Team", href: "#" }
    ]
  },
  {
    label: "Project",
    bgColor: "#6D28D9",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Project", href: "#" },
      { label: "Case Studies", ariaLabel: "Project Case Studies", href: "#" }
    ]
  },
  {
    label: "Contact",
    bgColor: "#8B5CF6",
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us", href: "#" },
      { label: "Twitter", ariaLabel: "Twitter", href: "#" },
      { label: "LinkedIn", ariaLabel: "LinkedIn", href: "#" }
    ]
  }
];

export default function Home() {
  return (
    <div className="relative bg-white text-slate-800 overflow-hidden">

      {/* GLOBAL DOT GRID BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <DotGrid
          dotSize={3}
          gap={36}
          baseColor="#8b5cf6"
          activeColor="#5227FF"
          proximity={120}
          speedTrigger={100}
          shockRadius={200}
          shockStrength={4}
          maxSpeed={4000}
          resistance={800}
          returnDuration={1.2}
        />
      </div>

      <main className="relative z-10">

        {/* Navigation */}
        <CardNav
          logo=""
          items={items}
          baseColor="#fff"
          menuColor="#8b5cf6"
          buttonBgColor="#8b5cf6"
          buttonTextColor="#fff"
          ease="power3.out"
        />

        {/* ================= HERO ================= */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">

          {/* Subtle radial lavender glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(139,92,246,0.15),transparent_60%)]" />

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
            Academic Clarity,
            <br />
            <span className="text-purple-600">
              <TextType
                text={["Structured", "Measured", "Transparent", "Open-Source"]}
                typingSpeed={60}
                pauseDuration={1200}
                showCursor
                cursorCharacter="|"
                deletingSpeed={40}
                cursorBlinkDuration={0.8}
              />
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
            An open-source clarity analytics layer for modern classrooms.
            Track doubts, identify confusion patterns, and improve learning outcomes.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            <a
              href="/onboarding"
              className="px-7 py-3 rounded-2xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-sm"
            >
              Get Started
            </a>

            <a
              href="#"
              className="px-7 py-3 rounded-2xl border border-slate-300 font-medium hover:bg-slate-100 transition"
            >
              GitHub (AGPLv3)
            </a>
          </div>
        </section>

        {/* ================= PROBLEM ================= */}
        <section className="relative py-24 md:py-32 bg-slate-50 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              The Problem With Modern Classrooms
            </h2>

            <div className="mt-12 grid md:grid-cols-2 gap-10 text-left">
              <ul className="space-y-4 text-slate-600">
                <li>• Doubts buried inside chat threads</li>
                <li>• No structured tracking of confusion</li>
                <li>• Repetitive explanations across sessions</li>
              </ul>
              <ul className="space-y-4 text-slate-600">
                <li>• No topic-wise insight for professors</li>
                <li>• No measurable clarity feedback</li>
                <li>• Scattered academic communication</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= SOLUTION ================= */}
        <section className="relative py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              A Structured Doubt Lifecycle
            </h2>

            <div className="mt-14 grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "1. Student Posts Doubt",
                  desc: "Tagged by subject and date, attached to the right class session."
                },
                {
                  title: "2. Professor Responds",
                  desc: "Marks as resolved, discuss next class, or still unclear."
                },
                {
                  title: "3. Analytics Generated",
                  desc: "Identify weak topics, confusion trends, and unresolved ratios."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-3 text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ANALYTICS ================= */}
        <section className="relative py-24 md:py-32 bg-slate-50 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Clarity Analytics Dashboard
            </h2>

            <div className="mt-14 grid md:grid-cols-3 gap-8">
              {[
                { label: "Most Confused Topic", value: "Database Normalization" },
                { label: "Unresolved Doubts", value: "18%" },
                { label: "Weekly Doubts", value: "42 Questions" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-purple-600">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= OPEN SOURCE ================= */}
        <section className="relative py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Built for Openness
            </h2>

            <p className="mt-6 text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Licensed under AGPL v3. Fully self-hostable. Transparent codebase.
              No vendor lock-in. Designed to keep academic infrastructure open.
            </p>

            <div className="mt-10">
              <a
                href="#"
                className="px-8 py-3 rounded-2xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition shadow-sm"
              >
                Contribute on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <Footer />

      </main>
    </div>
  );
}