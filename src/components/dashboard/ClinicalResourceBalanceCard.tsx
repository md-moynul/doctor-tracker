"use client";

import Link from "next/link";
import { DashboardAnalyticsData } from "@/lib/analytics";

interface ClinicalResourceBalanceCardProps {
  data: DashboardAnalyticsData | null;
}

export default function ClinicalResourceBalanceCard({
  data,
}: ClinicalResourceBalanceCardProps) {
  const avgPatients =
    data && data.totalDoctors > 0
      ? (data.totalPatients / data.totalDoctors).toFixed(1)
      : "0.0";

  const activeSpecialties = data?.departmentStats?.length || 0;
  const recordedDays =
    data?.dateBasedStats?.filter((d) => d.total > 0).length || 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Hospital Overview
          </span>
          <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200/60 font-semibold">
            Aggregated Metrics
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mt-3">
          Clinical Resource Balance
        </h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Live doctor-to-patient workload distribution and admission metrics computed directly from active clinical records.
        </p>

        <div className="mt-5 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100/70 transition-colors">
            <span className="text-xs text-slate-600 font-medium">Avg. Patients Per Doctor</span>
            <span className="text-sm font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              {avgPatients}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100/70 transition-colors">
            <span className="text-xs text-slate-600 font-medium">Active Specialties</span>
            <span className="text-sm font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              {activeSpecialties}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100/70 transition-colors">
            <span className="text-xs text-slate-600 font-medium">Recorded Dates</span>
            <span className="text-sm font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              {recordedDays} Days
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          href="/patients"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
        >
          Go to Patient Registry →
        </Link>
      </div>
    </div>
  );
}

