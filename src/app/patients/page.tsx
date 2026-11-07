"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllPatients, deletePatient } from "@/lib/patient";
import EditPatientModal from "@/components/EditPatientModal";
import PatientSearchBar from "@/components/PatientSearchBar";
import PatientFilters from "@/components/PatientFilters";
import Pagination from "@/components/Pagination";

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPatient, setEditingPatient] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Pagination States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [datePreset, setDatePreset] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Metadata from server
  const [availableConditions, setAvailableConditions] = useState<string[]>([]);
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    All: 0,
    Admitted: 0,
    Outpatient: 0,
    Discharged: 0,
  });

  // Debounce search input by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Server-side fetch patients with filters and pagination
  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllPatients({
        page,
        limit,
        search: debouncedSearch.trim() || undefined,
        status: statusFilter !== "All" ? statusFilter : undefined,
        condition: conditionFilter !== "All" ? conditionFilter : undefined,
        department: departmentFilter !== "All" ? departmentFilter : undefined,
        bloodGroup: bloodGroupFilter !== "All" ? bloodGroupFilter : undefined,
        gender: genderFilter !== "All" ? genderFilter : undefined,
        datePreset: datePreset !== "all" ? datePreset : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });

      if (res.success && Array.isArray(res.data)) {
        const mapped = res.data.map((p: any, index: number) => ({
          _id: p._id,
          id: p._id ? `PAT-${String(p._id).slice(-4).toUpperCase()}` : `PAT-00${index + 1}`,
          name: p.name,
          age: p.age,
          gender: p.gender,
          bloodGroup: p.bloodGroup || "N/A",
          doctor: p.doctorName ? `Dr. ${p.doctorName.replace(/^Dr\.\s*/i, '')}` : "Assigned Physician",
          doctorName: p.doctorName || "",
          doctorId: p.doctorId || "",
          department: p.department || "General",
          status: p.status || "Outpatient",
          hospital: p.hospital || "General Hospital",
          createdAt: p.createdAt || "",
          admissionDate: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Today",
          condition: p.condition,
          phone: p.phone || "",
        }));

        setPatients(mapped);

        if (res.pagination) {
          setTotalCount(res.pagination.total);
          setTotalPages(res.pagination.totalPages);
        }

        if (res.meta) {
          if (res.meta.availableConditions) {
            setAvailableConditions(res.meta.availableConditions);
          }
          if (res.meta.availableDepartments) {
            setAvailableDepartments(res.meta.availableDepartments);
          }
          if (res.meta.statusCounts) {
            setStatusCounts(res.meta.statusCounts);
          }
        }
      } else {
        setPatients([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching patients in frontend:", err);
      setPatients([]);
      setTotalCount(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    limit,
    debouncedSearch,
    statusFilter,
    conditionFilter,
    departmentFilter,
    bloodGroupFilter,
    genderFilter,
    datePreset,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handlePatientUpdated = () => {
    fetchPatients();
  };

  const handleDeletePatient = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete patient "${name}"?`)) {
      return;
    }

    try {
      await deletePatient(id);
      fetchPatients();
    } catch (err: any) {
      alert("Failed to delete patient: " + (err?.data?.message || err?.message || "Unknown error"));
    }
  };

  // Check if any filter is active
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    statusFilter !== "All" ||
    conditionFilter !== "All" ||
    departmentFilter !== "All" ||
    bloodGroupFilter !== "All" ||
    genderFilter !== "All" ||
    datePreset !== "all" ||
    startDate !== "" ||
    endDate !== "";

  const resetAllFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setStatusFilter("All");
    setConditionFilter("All");
    setDepartmentFilter("All");
    setBloodGroupFilter("All");
    setGenderFilter("All");
    setDatePreset("all");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Header and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold uppercase mb-1">
            Clinical Records
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Patient Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track inpatient admissions, outpatient appointments, assigned physicians, and vital summaries.
          </p>
        </div>

        {/* Modular Search Bar Component */}
        <PatientSearchBar
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
          }}
          placeholder="Search patient, ID, condition, phone..."
        />
      </div>

      {/* Modular Filters Component */}
      <PatientFilters
        statusFilter={statusFilter}
        onStatusChange={(newStatus) => {
          setStatusFilter(newStatus);
          setPage(1);
        }}
        statusCounts={statusCounts}
        conditionFilter={conditionFilter}
        onConditionChange={(newCond) => {
          setConditionFilter(newCond);
          setPage(1);
        }}
        availableConditions={availableConditions}
        departmentFilter={departmentFilter}
        onDepartmentChange={(newDept) => {
          setDepartmentFilter(newDept);
          setPage(1);
        }}
        availableDepartments={availableDepartments}
        bloodGroupFilter={bloodGroupFilter}
        onBloodGroupChange={(newBg) => {
          setBloodGroupFilter(newBg);
          setPage(1);
        }}
        genderFilter={genderFilter}
        onGenderChange={(newGen) => {
          setGenderFilter(newGen);
          setPage(1);
        }}
        datePreset={datePreset}
        onDatePresetChange={(newPreset) => {
          setDatePreset(newPreset);
          setPage(1);
        }}
        startDate={startDate}
        onStartDateChange={(newStart) => {
          setStartDate(newStart);
          setPage(1);
        }}
        endDate={endDate}
        onEndDateChange={(newEnd) => {
          setEndDate(newEnd);
          setPage(1);
        }}
        searchQuery={searchQuery}
        onClearSearch={() => {
          setSearchQuery("");
          setDebouncedSearch("");
          setPage(1);
        }}
        hasActiveFilters={hasActiveFilters}
        onResetAll={resetAllFilters}
        totalCount={totalCount}
        filteredCount={patients.length}
      />

      {/* Patients Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden relative">
        {/* Loading Bar */}
        {isLoading && (
          <div className="absolute top-0 inset-x-0 h-1 bg-blue-100 overflow-hidden z-10">
            <div className="h-full bg-blue-600 animate-pulse w-full" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Patient Info</th>
                <th className="px-6 py-4">Blood & Vitals</th>
                <th className="px-6 py-4">Assigned Doctor</th>
                <th className="px-6 py-4">Hospital / Clinic</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {isLoading && patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
                      <svg className="w-4 h-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading patient records from server...
                    </div>
                  </td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <div className="max-w-sm mx-auto space-y-2">
                      <svg className="w-10 h-10 mx-auto text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                      <p className="text-slate-600 font-medium">No patient records found</p>
                      <p className="text-xs text-slate-400">
                        {hasActiveFilters
                          ? "No records match your selected filter criteria. Try adjusting or clearing your filters."
                          : "No patient records currently registered in the database."}
                      </p>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetAllFilters}
                          className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
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
                      <div className="text-slate-800 font-medium">{p.hospital}</div>
                      <div className="text-xs text-slate-400">
                        {p.status?.toLowerCase() === "admitted"
                          ? `Admitted at ${p.admissionDate}`
                          : `Appointed at ${p.admissionDate}`}
                      </div>
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
                      <div className="inline-flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPatient(p);
                            setIsEditModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit
                        </button>
                        {p._id && (
                          <button
                            type="button"
                            onClick={() => handleDeletePatient(p._id, p.name)}
                            title="Delete Patient"
                            className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Server-side Pagination Component */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={limit}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          isLoading={isLoading}
        />
      </div>

      {/* Edit Patient Modal */}
      <EditPatientModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPatient(null);
        }}
        patient={editingPatient}
        onSuccess={handlePatientUpdated}
      />
    </div>
  );
}
