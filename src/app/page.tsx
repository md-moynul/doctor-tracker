import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase">
          Doctor & Patient Portal
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Smart Healthcare & <span className="text-blue-600">Doctor Tracker</span>
        </h1>
        <p className="text-lg text-slate-600">
          Streamline doctor appointments, patient management, and clinic tracking from a unified dashboard.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/doctors"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/25"
          >
            Explore Doctors
          </Link>
          <Link
            href="/patients"
            className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-xs"
          >
            Manage Patients
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-xs"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
