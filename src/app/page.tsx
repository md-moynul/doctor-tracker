import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 border-b border-slate-200/60">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-100/40 via-teal-50/40 to-indigo-100/30 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/60 text-blue-700 text-xs font-semibold shadow-2xs backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Next-Gen Hospital Operations & Clinical Roster Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Intelligent Doctor Tracking &{" "}
              <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                Clinical Operations
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Streamline physician workload distribution, track live inpatient admissions, and analyze multi-department clinical trends from a unified, enterprise-grade operations platform.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/25 transition-all active:scale-95 group"
              >
                <span>Launch Operations Dashboard</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <Link
                href="/doctors"
                className="inline-flex items-center px-5 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-2xs transition-all active:scale-95"
              >
                Physician Directory
              </Link>

              <Link
                href="/patients"
                className="inline-flex items-center px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-2xs transition-all active:scale-95"
              >
                Patient Management
              </Link>
            </div>

            {/* Trust / Metric Pills */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-200/80 text-left">
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 shadow-2xs">
                <div className="text-xl font-bold text-slate-900">Real-Time</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Workload Analytics</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 shadow-2xs">
                <div className="text-xl font-bold text-slate-900">30-Day</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Admission Trends</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 shadow-2xs">
                <div className="text-xl font-bold text-slate-900">Multi-Filter</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Server-Side Triage</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 shadow-2xs">
                <div className="text-xl font-bold text-slate-900">99.9%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Operational Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Core Clinical Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Modern Hospitals & Clinics
          </h2>
          <p className="text-sm text-slate-600">
            Everything administrators, head physicians, and triage nurses need to oversee patient flow and clinical workloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-4">
                Interactive Recharts Analytics
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Visualize physician patient distribution with interactive Bar Charts and track daily admission trends using smooth multi-series Area Charts.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <Link href="/dashboard" className="hover:text-blue-700 flex items-center gap-1">
                View Charts Demo →
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-4">
                Doctor Workload Tracking
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Prevent physician burnout by monitoring active case allocations across Cardiologists, Neurologists, Pediatricians, and Surgeons.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600">
              <Link href="/doctors" className="hover:text-teal-700 flex items-center gap-1">
                Explore Doctor Roster →
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-4">
                Inpatient & Outpatient Lifecycle
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Track patients through their entire clinical journey with color-coded badges for Admitted, Outpatient, and Discharged states.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <Link href="/patients" className="hover:text-indigo-700 flex items-center gap-1">
                Manage Patient Status →
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-4">
                Server-Side Multi-Filters
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Instant database filtering by medical department, condition, blood group, gender, and custom date ranges with zero UI lag.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
              <Link href="/patients" className="hover:text-amber-700 flex items-center gap-1">
                Try Multi-Filters →
              </Link>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-4">
                Instant Roster Inspection
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                One-click modal inspection displays all assigned inpatients and outpatients under any physician without reloading the page.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
              <Link href="/doctors" className="hover:text-purple-700 flex items-center gap-1">
                Test Modal Inspection →
              </Link>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-4">
                Secure Authentication
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Protected administrative routes with Better Auth and MongoDB adapter ensuring clinical data access is strictly governed.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
              <Link href="/login" className="hover:text-emerald-700 flex items-center gap-1">
                Admin Sign In →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Clinical Workflow Section */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
              Operational Flow
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How DoctorTracker Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              A streamlined 3-step workflow connecting medical intake with physician capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-3xl font-extrabold text-blue-600">01</div>
              <h3 className="text-base font-bold text-slate-900 mt-3">Physician Onboarding</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Register verified specialists with medical qualifications, department specialties, and hospital affiliations.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-3xl font-extrabold text-teal-600">02</div>
              <h3 className="text-base font-bold text-slate-900 mt-3">Patient Intake & Assignment</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Record patient vitals, clinical condition, and blood group, then immediately assign them to the appropriate on-duty doctor.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-3xl font-extrabold text-indigo-600">03</div>
              <h3 className="text-base font-bold text-slate-900 mt-3">Real-Time Operations Analytics</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Monitor physician patient capacity, inpatient admissions, and 30-day clinical statistics on the live Recharts dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-8 sm:p-12 shadow-xl shadow-blue-700/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Upgrade Hospital Roster Operations?
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Experience real-time analytics, seamless physician patient allocations, and high-performance server-side filtering.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors shadow-xs"
            >
              Enter Dashboard
            </Link>
            <Link
              href="/patients"
              className="px-6 py-3 rounded-xl bg-blue-500/30 hover:bg-blue-500/40 text-white border border-white/20 font-semibold text-sm transition-colors"
            >
              Patient Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              +
            </div>
            <span className="font-semibold text-slate-800">DoctorTracker</span>
            <span>• Care & Health Operations Portal</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/doctors" className="hover:text-blue-600 transition-colors">
              Doctors
            </Link>
            <Link href="/patients" className="hover:text-blue-600 transition-colors">
              Patients
            </Link>
            <Link href="/login" className="hover:text-blue-600 transition-colors">
              Sign In
            </Link>
          </div>

          <div>
            <span>© 2026 DoctorTracker. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
