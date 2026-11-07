"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [filterStatus, setFilterStatus] = useState("all");

  const stats = [
    {
      title: "Total Doctors",
      value: "48",
      change: "+4 this month",
      trend: "up",
      color: "blue",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Active Patients",
      value: "1,240",
      change: "+12% vs last week",
      trend: "up",
      color: "teal",
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Today's Appointments",
      value: "84",
      change: "18 remaining",
      trend: "neutral",
      color: "indigo",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Available Rooms/Beds",
      value: "32",
      change: "85% occupancy",
      trend: "down",
      color: "amber",
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  const appointments = [
    {
      id: "APT-1042",
      patient: "Rahim Ahmed",
      patientAge: "42 yrs",
      doctor: "Dr. Sarah Smith",
      specialty: "Cardiology",
      time: "10:30 AM",
      date: "Today",
      room: "Room 302",
      status: "Confirmed",
    },
    {
      id: "APT-1043",
      patient: "Fatima Khan",
      patientAge: "29 yrs",
      doctor: "Dr. Tanvir Hasan",
      specialty: "Neurology",
      time: "11:15 AM",
      date: "Today",
      room: "Room 108",
      status: "In Progress",
    },
    {
      id: "APT-1044",
      patient: "Abdur Rashid",
      patientAge: "58 yrs",
      doctor: "Dr. Sarah Smith",
      specialty: "Cardiology",
      time: "01:00 PM",
      date: "Today",
      room: "Room 302",
      status: "Confirmed",
    },
    {
      id: "APT-1045",
      patient: "Nusrat Jahan",
      patientAge: "35 yrs",
      doctor: "Dr. Ayesha Siddiqua",
      specialty: "Pediatrics",
      time: "02:30 PM",
      date: "Today",
      room: "Room 214",
      status: "Pending",
    },
    {
      id: "APT-1046",
      patient: "Kamal Hossain",
      patientAge: "51 yrs",
      doctor: "Dr. Michael Chen",
      specialty: "Orthopedics",
      time: "04:00 PM",
      date: "Today",
      room: "Room 401",
      status: "Completed",
    },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    if (filterStatus === "all") return true;
    return apt.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20";
      case "In Progress":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20";
      case "Completed":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20";
      case "Pending":
        return "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-400/20";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Hospital Operations Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time tracking of doctors, patient visits, and clinical schedules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/doctors"
            className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 shadow-xs transition-colors"
          >
            Doctors Directory
          </Link>
          <Link
            href="/patients"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-xs shadow-blue-600/30 transition-all active:scale-95"
          >
            + Register Patient
          </Link>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{stat.title}</span>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                {stat.icon}
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-slate-900">{stat.value}</span>
            </div>
            <div className="mt-2 text-xs font-medium text-slate-500 flex items-center gap-1.5">
              <span className="text-emerald-600 font-semibold">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid: Appointments & Doctor On-Duty */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Appointments Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Today&apos;s Appointments</h2>
              <p className="text-xs text-slate-500">Live patient schedule queue</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
              {["all", "confirmed", "in progress", "completed"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterStatus(tab)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
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

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Patient</th>
                  <th className="px-6 py-3.5">Assigned Doctor</th>
                  <th className="px-6 py-3.5">Time & Location</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                      No appointments matching this filter.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{apt.patient}</div>
                        <div className="text-xs text-slate-400">{apt.id} • {apt.patientAge}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{apt.doctor}</div>
                        <div className="text-xs text-blue-600">{apt.specialty}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900 font-medium">{apt.time}</div>
                        <div className="text-xs text-slate-400">{apt.room}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                            apt.status
                          )}`}
                        >
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Doctors On Duty Today */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Doctors On Duty</h2>
            <Link href="/doctors" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Dr. Sarah Smith",
                dept: "Cardiology",
                room: "Room 302",
                status: "In Consultation",
                avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face",
              },
              {
                name: "Dr. Tanvir Hasan",
                dept: "Neurology",
                room: "Room 108",
                status: "Available",
                avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&h=120&fit=crop&crop=face",
              },
              {
                name: "Dr. Ayesha Siddiqua",
                dept: "Pediatrics",
                room: "Room 214",
                status: "Available",
                avatar: "https://images.unsplash.com/photo-1594824813628-9a40a0279644?w=120&h=120&fit=crop&crop=face",
              },
              {
                name: "Dr. Michael Chen",
                dept: "Orthopedics",
                room: "Room 401",
                status: "In Surgery",
                avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&h=120&fit=crop&crop=face",
              },
            ].map((doc) => (
              <div key={doc.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 leading-tight">{doc.name}</h4>
                    <p className="text-xs text-slate-500">{doc.dept} • {doc.room}</p>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    doc.status === "Available"
                      ? "bg-emerald-100 text-emerald-800"
                      : doc.status === "In Surgery"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {doc.status}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-900">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700">Need emergency assistance?</h4>
              <p className="text-xs text-blue-800 mt-1">Directly connect to ER dispatcher or on-call surgeon roster.</p>
              <button
                type="button"
                className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                Call ER Coordinator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
