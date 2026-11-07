"use client";

import { useState } from "react";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const patients = [
    {
      id: "PAT-0091",
      name: "Rahim Ahmed",
      age: 42,
      gender: "Male",
      bloodGroup: "O+",
      doctor: "Dr. Sarah Smith",
      department: "Cardiology",
      status: "Admitted",
      room: "Ward 3, Bed 12",
      admissionDate: "Oct 28, 2026",
      condition: "Hypertensive Crisis (Stable)",
    },
    {
      id: "PAT-0092",
      name: "Fatima Khan",
      age: 29,
      gender: "Female",
      bloodGroup: "B+",
      doctor: "Dr. Tanvir Hasan",
      department: "Neurology",
      status: "Outpatient",
      room: "OPD Room 108",
      admissionDate: "Nov 02, 2026",
      condition: "Chronic Migraine Follow-up",
    },
    {
      id: "PAT-0093",
      name: "Abdur Rashid",
      age: 58,
      gender: "Male",
      bloodGroup: "A+",
      doctor: "Dr. Sarah Smith",
      department: "Cardiology",
      status: "Admitted",
      room: "ICU Unit 4",
      admissionDate: "Nov 05, 2026",
      condition: "Post-Angioplasty Monitoring",
    },
    {
      id: "PAT-0094",
      name: "Nusrat Jahan",
      age: 8,
      gender: "Female",
      bloodGroup: "AB+",
      doctor: "Dr. Ayesha Siddiqua",
      department: "Pediatrics",
      status: "Discharged",
      room: "-",
      admissionDate: "Oct 24, 2026",
      condition: "Viral Fever Recovery",
    },
    {
      id: "PAT-0095",
      name: "Kamal Hossain",
      age: 51,
      gender: "Male",
      bloodGroup: "O-",
      doctor: "Dr. Michael Chen",
      department: "Orthopedics",
      status: "Admitted",
      room: "Ward 2, Bed 05",
      admissionDate: "Nov 04, 2026",
      condition: "Tibial Fracture Surgery Rehab",
    },
    {
      id: "PAT-0096",
      name: "Sadia Sultana",
      age: 33,
      gender: "Female",
      bloodGroup: "B-",
      doctor: "Dr. David Rahman",
      department: "General Medicine",
      status: "Outpatient",
      room: "OPD Room 201",
      admissionDate: "Nov 06, 2026",
      condition: "Type 2 Diabetes Screening",
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesQuery =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || patient.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesQuery && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Admitted":
        return "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20";
      case "Outpatient":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20";
      case "Discharged":
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-400/20";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase mb-2">
            Clinical Records
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Patient Management
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Track inpatient admissions, outpatient appointments, assigned physicians, and vital summaries.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search patient, ID, or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
          />
          <svg
            className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["All", "Admitted", "Outpatient", "Discharged"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setStatusFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              statusFilter === tab
                ? "bg-blue-600 text-white shadow-xs shadow-blue-500/30"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Patient Info</th>
                <th className="px-6 py-4">Blood & Vitals</th>
                <th className="px-6 py-4">Assigned Doctor</th>
                <th className="px-6 py-4">Ward / Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No patient records found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{p.name}</div>
                      <div className="text-xs text-slate-400">
                        {p.id} • {p.age} yrs • {p.gender}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        {p.bloodGroup}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 truncate max-w-[150px]">
                        {p.condition}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{p.doctor}</div>
                      <div className="text-xs text-blue-600">{p.department}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-800 font-medium">{p.room}</div>
                      <div className="text-xs text-slate-400">Since {p.admissionDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                      >
                        View File
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
