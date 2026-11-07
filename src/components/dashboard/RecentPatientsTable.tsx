"use client";

import { useState } from "react";
import Link from "next/link";
import { RecentPatient } from "@/lib/analytics";

interface RecentPatientsTableProps {
  patients: RecentPatient[];
  loading: boolean;
}

export default function RecentPatientsTable({
  patients,
  loading,
}: RecentPatientsTableProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = patients.filter((pat) => {
    if (filterStatus === "all") return true;
    return (pat.status || "").toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadge = (status: string) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "admitted":
        return "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20";
      case "outpatient":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20";
      case "discharged":
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-400/20";
      default:
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h2 className="text-lg font-bold text-slate-900">Recent Patient Records</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Live clinical patient admissions and consultations</p>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
            {["all", "admitted", "outpatient", "discharged"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterStatus(tab)}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors cursor-pointer ${
                  filterStatus === tab
                    ? "bg-white text-slate-900 font-semibold shadow-xs"
                    : "hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Patient Info</th>
                <th className="px-6 py-3.5">Condition / Diagnosis</th>
                <th className="px-6 py-3.5">Assigned Doctor</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {loading ? (
                [1, 2, 3, 4].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-28 mb-1.5"></div>
                      <div className="h-3 bg-slate-100 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-32 mb-1.5"></div>
                      <div className="h-3 bg-slate-100 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-slate-100 rounded-full w-20"></div>
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                    <p className="text-sm font-medium">No patient records found.</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Register a patient to track their status on the dashboard.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((pat) => (
                  <tr key={pat._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{pat.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>{pat.age} yrs</span>
                        <span>•</span>
                        <span>{pat.gender}</span>
                        {pat.bloodGroup && (
                          <>
                            <span>•</span>
                            <span className="font-semibold text-rose-600">{pat.bloodGroup}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800">
                        {pat.condition || "General Consultation"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">
                        {pat.doctorName?.startsWith("Dr.") ? pat.doctorName : `Dr. ${pat.doctorName || "Assigned Physician"}`}
                      </div>
                      <div className="text-xs text-blue-600">{pat.department || "General Medicine"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                          pat.status
                        )}`}
                      >
                        {pat.status || "Outpatient"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filtered.length} recent patient records</span>
        <Link
          href="/patients"
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all patients in directory →
        </Link>
      </div>
    </div>
  );
}

