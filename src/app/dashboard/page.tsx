"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getDashboardAnalytics, DashboardAnalyticsData } from "@/lib/analytics";
import StatCards from "@/components/dashboard/StatCards";
import PatientsPerDoctorChart from "@/components/dashboard/PatientsPerDoctorChart";
import DateStatsChart from "@/components/dashboard/DateStatsChart";
import DepartmentPieChart from "@/components/dashboard/DepartmentPieChart";
import ClinicalResourceBalanceCard from "@/components/dashboard/ClinicalResourceBalanceCard";
import RecentPatientsTable from "@/components/dashboard/RecentPatientsTable";
import ActiveDoctorsRoster from "@/components/dashboard/ActiveDoctorsRoster";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadAnalytics = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const res = await getDashboardAnalytics();
      if (res && res.success && res.data) {
        setData(res.data);
      } else {
        setError(res?.message || "Failed to load dashboard analytics");
      }
    } catch (err: any) {
      console.error("Dashboard analytics error:", err);
      setError(err?.message || "Network error loading analytics. Please check your backend.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Hospital Operations Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Data
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time analytics for doctors, patient workloads, and clinical trends.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => loadAnalytics(true)}
            disabled={refreshing || loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 shadow-xs transition-colors disabled:opacity-50"
            title="Refresh dashboard data"
          >
            <svg
              className={`w-4 h-4 text-slate-500 ${refreshing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <Link
            href="/doctors"
            className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 shadow-xs transition-colors"
          >
            Doctor Directory
          </Link>

          <Link
            href="/patients"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-xs shadow-blue-600/30 transition-all active:scale-95"
          >
            + Register Patient
          </Link>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-rose-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => loadAnalytics(false)}
            className="text-xs font-semibold underline text-rose-700 hover:text-rose-900"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Top 4 Stat Cards */}
      <StatCards data={data} loading={loading} />

      {/* Charts Section: Patients per Doctor & Date-based Trends */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PatientsPerDoctorChart
            data={data?.patientsPerDoctor || []}
            loading={loading}
          />

          <DateStatsChart
            data={data?.dateBasedStats || []}
            loading={loading}
          />
        </div>
      )}

      {/* Specialty Breakdown & Clinical Overview */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donut Chart: 2 cols */}
          <div className="lg:col-span-2">
            <DepartmentPieChart
              departmentStats={data?.departmentStats || []}
              statusStats={data?.statusStats || []}
              loading={loading}
            />
          </div>

          {/* Quick Summary Card: 1 col */}
          <ClinicalResourceBalanceCard data={data} />
        </div>
      )}

      {/* Live Activity Records: Recent Patients & Active Doctors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Patients Table */}
        <div className="lg:col-span-2">
          <RecentPatientsTable
            patients={data?.recentPatients || []}
            loading={loading}
          />
        </div>

        {/* Right 1 Col: Active Doctors On Duty */}
        <div className="lg:col-span-1">
          <ActiveDoctorsRoster
            doctors={data?.activeDoctors || []}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
