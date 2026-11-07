"use client";

import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { CategoryStat } from "@/lib/analytics";

interface DepartmentPieChartProps {
  departmentStats: CategoryStat[];
  statusStats: CategoryStat[];
  loading: boolean;
}

const DEPT_COLORS = [
  "#2563eb", // Blue
  "#0d9488", // Teal
  "#8b5cf6", // Purple
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#6366f1", // Indigo
];

const STATUS_COLORS: Record<string, string> = {
  Admitted: "#8b5cf6",
  Outpatient: "#10b981",
  Discharged: "#64748b",
};

export default function DepartmentPieChart({
  departmentStats,
  statusStats,
  loading,
}: DepartmentPieChartProps) {
  const [activeTab, setActiveTab] = useState<"departments" | "status">("departments");

  const rawData = activeTab === "departments" ? departmentStats : statusStats;
  const currentData = rawData.filter((d) => d.count > 0);
  const totalCount = currentData.reduce((acc, curr) => acc + curr.count, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: CategoryStat = payload[0].payload;
      const percentage = totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-xl text-xs backdrop-blur-xs border border-slate-700/50">
          <div className="font-bold text-white text-sm">{item.name}</div>
          <div className="mt-1 flex items-center justify-between gap-4">
            <span className="text-slate-300">Patients:</span>
            <span className="font-extrabold text-blue-400">{item.count}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-400 text-[11px] mt-0.5">
            <span>Share:</span>
            <span>{percentage}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <h2 className="text-lg font-bold text-slate-900">
                {activeTab === "departments" ? "Department Breakdown" : "Status Distribution"}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeTab === "departments"
                ? "Case distribution across medical specialties"
                : "Active patient classification"}
            </p>
          </div>

          <div className="inline-flex items-center rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab("departments")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === "departments"
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              Specialties
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("status")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === "status"
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              Status
            </button>
          </div>
        </div>

        {/* Donut Chart and Legend */}
        {loading ? (
          <div className="h-72 w-full flex items-center justify-center bg-slate-50 rounded-xl animate-pulse">
            <span className="text-xs text-slate-400 font-medium">Loading distribution...</span>
          </div>
        ) : currentData.length === 0 ? (
          <div className="h-72 w-full flex flex-col items-center justify-center bg-slate-50/70 border border-dashed border-slate-200 rounded-xl p-6 text-center">
            <p className="text-sm font-semibold text-slate-700">No Patient Records Found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Registered patients will automatically populate the specialty distribution.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-64 w-full md:w-3/5 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="name"
                  >
                    {currentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          activeTab === "status"
                            ? STATUS_COLORS[entry.name] || DEPT_COLORS[index % DEPT_COLORS.length]
                            : DEPT_COLORS[index % DEPT_COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center Total Count Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-800">{totalCount}</span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Total
                </span>
              </div>
            </div>

            {/* Side Legend */}
            <div className="w-full md:w-2/5 space-y-2 max-h-60 overflow-y-auto pr-1">
              {currentData.map((item, idx) => {
                const color =
                  activeTab === "status"
                    ? STATUS_COLORS[item.name] || DEPT_COLORS[idx % DEPT_COLORS.length]
                    : DEPT_COLORS[idx % DEPT_COLORS.length];
                const pct = totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;

                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                      ></span>
                      <span className="truncate text-slate-700 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-400 text-[11px]">{pct}%</span>
                      <span className="font-bold text-slate-900">{item.count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Categories: <strong className="text-slate-800">{currentData.length}</strong></span>
        <span>Live aggregate statistics</span>
      </div>
    </div>
  );
}

