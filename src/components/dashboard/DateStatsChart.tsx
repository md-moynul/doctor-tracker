"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { DateBasedStat } from "@/lib/analytics";

interface DateStatsChartProps {
  data: DateBasedStat[];
  loading: boolean;
}

export default function DateStatsChart({ data, loading }: DateStatsChartProps) {
  const [rangeFilter, setRangeFilter] = useState<"7d" | "14d" | "all">("7d");

  const getFilteredData = (): DateBasedStat[] => {
    // Map all records received from the backend by dateKey (YYYY-MM-DD)
    const dataMap = new Map<string, DateBasedStat>();
    (data || []).forEach((item) => {
      dataMap.set(item.date, item);
    });

    const today = new Date();

    if (rangeFilter === "7d") {
      const res: DateBasedStat[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateKey = d.toISOString().split("T")[0];
        const existing = dataMap.get(dateKey);
        if (existing) {
          res.push(existing);
        } else {
          res.push({
            date: dateKey,
            displayDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            total: 0,
            admitted: 0,
            outpatient: 0,
            discharged: 0,
          });
        }
      }
      return res;
    }

    if (rangeFilter === "14d") {
      const res: DateBasedStat[] = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateKey = d.toISOString().split("T")[0];
        const existing = dataMap.get(dateKey);
        if (existing) {
          res.push(existing);
        } else {
          res.push({
            date: dateKey,
            displayDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            total: 0,
            admitted: 0,
            outpatient: 0,
            discharged: 0,
          });
        }
      }
      return res;
    }

    // rangeFilter === "all": 30 days minimum timeline + any older records
    const res: DateBasedStat[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      const existing = dataMap.get(dateKey);
      if (existing) {
        res.push(existing);
      } else {
        res.push({
          date: dateKey,
          displayDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          total: 0,
          admitted: 0,
          outpatient: 0,
          discharged: 0,
        });
      }
    }

    // Include any historical records older than 30 days
    (data || []).forEach((item) => {
      const itemDate = new Date(item.date);
      const diffDays = (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays >= 30 && !res.some((r) => r.date === item.date)) {
        res.push(item);
      }
    });

    return res.sort((a, b) => a.date.localeCompare(b.date));
  };

  const chartData = getFilteredData();
  const maxVal = Math.max(...chartData.map((d) => d.total), 5);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item: DateBasedStat = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl shadow-xl text-xs backdrop-blur-xs border border-slate-700/50 min-w-[200px]">
          <div className="font-semibold text-slate-300 border-b border-slate-700/80 pb-1.5 mb-2 flex items-center justify-between">
            <span>{item.displayDate}</span>
            <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-blue-300">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Total Patients:
              </span>
              <span className="font-bold text-white">{item.total}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-indigo-300">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Admitted (Inpatients):
              </span>
              <span className="font-bold text-white">{item.admitted}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Outpatient Visits:
              </span>
              <span className="font-bold text-white">{item.outpatient}</span>
            </div>

            {item.discharged > 0 && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  Discharged:
                </span>
                <span className="font-bold text-white">{item.discharged}</span>
              </div>
            )}
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
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <h2 className="text-lg font-bold text-slate-900">Date-Based Statistics</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily trend of patient registrations, admissions, and consultations
            </p>
          </div>

          <div className="inline-flex items-center rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setRangeFilter("7d")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                rangeFilter === "7d" ? "bg-white text-slate-900 font-semibold shadow-xs" : "hover:text-slate-900"
              }`}
            >
              Last 7 Days
            </button>
            <button
              type="button"
              onClick={() => setRangeFilter("14d")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                rangeFilter === "14d" ? "bg-white text-slate-900 font-semibold shadow-xs" : "hover:text-slate-900"
              }`}
            >
              Last 14 Days
            </button>
            <button
              type="button"
              onClick={() => setRangeFilter("all")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                rangeFilter === "all" ? "bg-white text-slate-900 font-semibold shadow-xs" : "hover:text-slate-900"
              }`}
            >
              All Time (30D)
            </button>
          </div>
        </div>

        {/* Chart */}
        {loading ? (
          <div className="h-72 w-full flex items-center justify-center bg-slate-50 rounded-xl animate-pulse">
            <span className="text-xs text-slate-400 font-medium">Loading timeline statistics...</span>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-72 w-full flex flex-col items-center justify-center bg-slate-50/70 border border-dashed border-slate-200 rounded-xl p-6 text-center">
            <p className="text-sm font-semibold text-slate-700">No Date Statistics Available</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              As patients register and consult doctors, day-by-day trends will be generated automatically.
            </p>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAdmitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOutpatient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="displayDate"
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  minTickGap={16}
                />
                <YAxis
                  allowDecimals={false}
                  domain={[0, maxVal + 1]}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: 12, fontSize: 11 }}
                  iconType="circle"
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Total Visits"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                  activeDot={{ r: 5 }}
                />
                <Area
                  type="monotone"
                  dataKey="admitted"
                  name="Admitted"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAdmitted)"
                />
                <Area
                  type="monotone"
                  dataKey="outpatient"
                  name="Outpatient"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOutpatient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Timeline: <strong className="text-slate-800">{chartData.length} days</strong> displayed
        </span>
        <span className="text-slate-400">Updates live with every patient registration</span>
      </div>
    </div>
  );
}
