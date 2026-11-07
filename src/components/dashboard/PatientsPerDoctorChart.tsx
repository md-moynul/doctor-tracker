"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { DoctorPatientCount } from "@/lib/analytics";

interface PatientsPerDoctorChartProps {
  data: DoctorPatientCount[];
  loading: boolean;
}

export default function PatientsPerDoctorChart({
  data,
  loading,
}: PatientsPerDoctorChartProps) {
  const [viewLimit, setViewLimit] = useState<number>(8);

  const displayData = data.slice(0, viewLimit);
  const maxPatients = Math.max(...data.map((d) => d.patients), 5);

  const colors = [
    "#2563eb", // blue-600
    "#3b82f6", // blue-500
    "#0284c7", // sky-600
    "#0d9488", // teal-600
    "#059669", // emerald-600
    "#4f46e5", // indigo-600
    "#7c3aed", // violet-600
    "#9333ea", // purple-600
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: DoctorPatientCount = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-xl text-xs backdrop-blur-xs border border-slate-700/50 min-w-[180px]">
          <div className="font-bold text-sm text-white">{item.doctor}</div>
          <div className="text-blue-300 font-medium mt-0.5">{item.specialty}</div>
          {item.hospital && (
            <div className="text-slate-400 text-[11px] mt-0.5">{item.hospital}</div>
          )}
          <div className="mt-2.5 pt-2 border-t border-slate-700 flex items-center justify-between">
            <span className="text-slate-300">Total Patients:</span>
            <span className="font-extrabold text-white text-sm bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
              {item.patients}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h2 className="text-lg font-bold text-slate-900">Patients per Doctor</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Workload distribution across assigned physicians
            </p>
          </div>

          <div className="flex items-center gap-2">
            {data.length > 5 && (
              <div className="inline-flex items-center rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600">
                <button
                  type="button"
                  onClick={() => setViewLimit(5)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    viewLimit === 5 ? "bg-white text-slate-900 font-semibold shadow-xs" : "hover:text-slate-900"
                  }`}
                >
                  Top 5
                </button>
                <button
                  type="button"
                  onClick={() => setViewLimit(8)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    viewLimit === 8 ? "bg-white text-slate-900 font-semibold shadow-xs" : "hover:text-slate-900"
                  }`}
                >
                  Top 8
                </button>
                {data.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setViewLimit(data.length)}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      viewLimit === data.length ? "bg-white text-slate-900 font-semibold shadow-xs" : "hover:text-slate-900"
                    }`}
                  >
                    All
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chart Area */}
        {loading ? (
          <div className="h-72 w-full flex items-center justify-center bg-slate-50 rounded-xl animate-pulse">
            <span className="text-xs text-slate-400 font-medium">Loading doctor workload data...</span>
          </div>
        ) : data.length === 0 ? (
          <div className="h-72 w-full flex flex-col items-center justify-center bg-slate-50/70 border border-dashed border-slate-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-700">No Doctor Data Available</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Add doctors and assign patients to track physician patient loads.
            </p>
            <Link
              href="/doctors"
              className="mt-3 inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              Add Doctors
            </Link>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={displayData}
                margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="shortName"
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  allowDecimals={false}
                  domain={[0, maxPatients + 1]}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="patients"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                >
                  {displayData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      className="transition-opacity hover:opacity-85 cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Total tracked doctors: <strong className="text-slate-800">{data.length}</strong></span>
        <Link
          href="/doctors"
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          View all doctors roster →
        </Link>
      </div>
    </div>
  );
}

