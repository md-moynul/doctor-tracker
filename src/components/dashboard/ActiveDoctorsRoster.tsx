"use client";

import Link from "next/link";
import { ActiveDoctor } from "@/lib/analytics";

interface ActiveDoctorsRosterProps {
  doctors: ActiveDoctor[];
  loading: boolean;
}

export default function ActiveDoctorsRoster({
  doctors,
  loading,
}: ActiveDoctorsRosterProps) {
  const getInitials = (name: string) => {
    return name
      .replace(/^Dr\.\s*/i, "")
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between">
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Physicians On Duty</h2>
            <p className="text-xs text-slate-500 mt-0.5">Live clinical doctor roster & workload</p>
          </div>
          <Link
            href="/doctors"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            All Doctors →
          </Link>
        </div>

        {/* Doctor List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <div className="h-4 bg-slate-200 rounded w-28 mb-1.5"></div>
                    <div className="h-3 bg-slate-100 rounded w-20"></div>
                  </div>
                </div>
                <div className="h-5 bg-slate-200 rounded-full w-16"></div>
              </div>
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <div className="p-6 text-center bg-slate-50/70 border border-dashed border-slate-200 rounded-xl">
            <p className="text-sm font-semibold text-slate-700">No Doctors Registered</p>
            <p className="text-xs text-slate-500 mt-1">
              Add your hospital doctors to start assigning patients.
            </p>
            <Link
              href="/doctors"
              className="mt-3 inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              Add Doctor
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors border border-slate-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">
                      {getInitials(doc.name)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 leading-tight truncate">
                      {doc.name.startsWith("Dr.") ? doc.name : `Dr. ${doc.name}`}
                    </h4>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {doc.specialization} • {doc.hospital || "Main Hospital"}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">
                    {doc.patientCount} {doc.patientCount === 1 ? "Patient" : "Patients"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Assistance card */}
      <div className="pt-5 mt-4 border-t border-slate-100">
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-900">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Clinical Operations
          </h4>
          <p className="text-xs text-blue-800 mt-1">
            Need to register a new physician or admit emergency cases?
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Link
              href="/doctors"
              className="flex-1 text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              Doctors Roster
            </Link>
            <Link
              href="/patients"
              className="flex-1 text-center py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              Patient Intake
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

