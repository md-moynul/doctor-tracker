"use client";

import Link from "next/link";
import { DashboardAnalyticsData } from "@/lib/analytics";

interface StatCardsProps {
  data: DashboardAnalyticsData | null;
  loading: boolean;
}

export default function StatCards({ data, loading }: StatCardsProps) {
  const totalDoctors = data?.totalDoctors ?? 0;
  const totalPatients = data?.totalPatients ?? 0;

  // Calculate admitted and outpatient counts from statusStats or recent data
  const admittedCount =
    data?.statusStats?.find((s) => s.name.toLowerCase() === "admitted")?.count ??
    data?.dateBasedStats?.reduce((acc, curr) => acc + (curr.admitted || 0), 0) ??
    0;

  const outpatientCount =
    data?.statusStats?.find((s) => s.name.toLowerCase() === "outpatient")?.count ??
    Math.max(0, totalPatients - admittedCount);

  const inpatientRatio =
    totalPatients > 0 ? Math.round((admittedCount / totalPatients) * 100) : 0;

  const cards = [
    {
      title: "Total Doctors",
      value: totalDoctors.toLocaleString(),
      subtext: "Verified Specialists & Physicians",
      href: "/doctors",
      linkText: "View Doctors →",
      accent: "blue",
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Total Patients",
      value: totalPatients.toLocaleString(),
      subtext: "Clinical Patient Records",
      href: "/patients",
      linkText: "View Patients →",
      accent: "teal",
      bgColor: "bg-teal-50 text-teal-600 border-teal-100",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Admitted Inpatients",
      value: admittedCount.toLocaleString(),
      subtext: `${inpatientRatio}% of total patient load`,
      href: "/patients?status=Admitted",
      linkText: "Manage Inpatients →",
      accent: "indigo",
      bgColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Outpatients",
      value: outpatientCount.toLocaleString(),
      subtext: "Day Clinic & Consultations",
      href: "/patients?status=Outpatient",
      linkText: "View Outpatients →",
      accent: "amber",
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs animate-pulse space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-200 rounded w-24"></div>
              <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
            </div>
            <div className="h-8 bg-slate-200 rounded w-16"></div>
            <div className="h-3 bg-slate-100 rounded w-36"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{card.title}</span>
              <div className={`p-2.5 rounded-xl border ${card.bgColor}`}>
                {card.icon}
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500 font-medium">
              {card.subtext}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <Link
              href={card.href}
              className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
            >
              {card.linkText}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

