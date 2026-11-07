"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllDoctors } from "@/lib/doctor";
import { getAllPatients, PatientResponse, deletePatient } from "@/lib/patient";
import AddDoctorModal from "@/components/AddDoctorModal";
import AddPatientModal, { TargetDoctor } from "@/components/AddPatientModal";
import DoctorSearchBar from "@/components/DoctorSearchBar";
import DoctorFilters from "@/components/DoctorFilters";
import DoctorCard, { DoctorItem } from "@/components/DoctorCard";
import DoctorPatientsModal from "@/components/DoctorPatientsModal";
import Pagination from "@/components/Pagination";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorItem[]>([]);
  const [patients, setPatients] = useState<PatientResponse[]>([]);

  // Server-side Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedHospital, setSelectedHospital] = useState("All");
  const [datePreset, setDatePreset] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filter metadata from server
  const [availableSpecialties, setAvailableSpecialties] = useState<string[]>([
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "General Medicine",
  ]);
  const [availableHospitals, setAvailableHospitals] = useState<string[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [patientDoctor, setPatientDoctor] = useState<TargetDoctor | null>(null);
  const [viewingDoctorPatients, setViewingDoctorPatients] = useState<DoctorItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search input by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Server-side fetch doctors with filters & pagination
  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    try {
      const [docRes, patRes] = await Promise.all([
        getAllDoctors({
          page,
          limit,
          search: debouncedSearch.trim() || undefined,
          specialty: selectedSpecialty !== "All" ? selectedSpecialty : undefined,
          hospital: selectedHospital !== "All" ? selectedHospital : undefined,
          datePreset: datePreset !== "all" ? datePreset : undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        }),
        getAllPatients().catch(() => ({ success: false, data: [] })),
      ]);

      if (docRes.success && Array.isArray(docRes.data)) {
        const mapped: DoctorItem[] = docRes.data.map((doc: any, index: number) => ({
          id: doc._id || `DOC-0${index + 1}`,
          name: doc.name || "",
          title: doc.specialization ? `Specialist in ${doc.specialization}` : "Physician",
          specialty: doc.specialization || "General Medicine",
          experience: doc.experience || "Active Physician",
          hospital: doc.hospital || "Hospital",
          rating: doc.rating || "5.0",
          reviews: doc.reviews || "0",
          avatar: doc.image || doc.avatar || "",
          about: doc.about || (doc.email ? `Email: ${doc.email} | Phone: ${doc.phone || "N/A"}` : "No details provided."),
        }));
        setDoctors(mapped);

        if (docRes.pagination) {
          setTotalCount(docRes.pagination.total);
          setTotalPages(docRes.pagination.totalPages);
        }

        if (docRes.meta) {
          if (docRes.meta.availableSpecialties && docRes.meta.availableSpecialties.length > 0) {
            setAvailableSpecialties((prev) =>
              Array.from(new Set([...prev, ...docRes.meta!.availableSpecialties]))
            );
          }
          if (docRes.meta.availableHospitals) {
            setAvailableHospitals(docRes.meta.availableHospitals);
          }
        }
      } else {
        setDoctors([]);
        setTotalCount(0);
        setTotalPages(1);
      }

      if (patRes.success && Array.isArray(patRes.data)) {
        setPatients(patRes.data);
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setDoctors([]);
      setTotalCount(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    limit,
    debouncedSearch,
    selectedSpecialty,
    selectedHospital,
    datePreset,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleDeleteDoctor = (id: string) => {
    if (confirm("Are you sure you want to remove this physician from the roster?")) {
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
    }
  };

  const handleDeletePatient = async (id: string, patientName: string) => {
    if (!confirm(`Are you sure you want to remove patient "${patientName}" from this doctor's list?`)) {
      return;
    }

    try {
      await deletePatient(id);
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert("Failed to delete patient: " + (err?.data?.message || err?.message || "Unknown error"));
    }
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedSpecialty !== "All" ||
    selectedHospital !== "All" ||
    datePreset !== "all" ||
    startDate !== "" ||
    endDate !== "";

  const resetAllFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedSpecialty("All");
    setSelectedHospital("All");
    setDatePreset("all");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Header with Title and Search Component */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Hospital Staff Roster
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Doctors Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-xl">
            Administrator console to track physician schedules, departments, and consultation availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Modular Search Bar Component */}
          <DoctorSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search doctor, hospital, specialty..."
          />

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="whitespace-nowrap px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-xs shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Doctor
          </button>
        </div>
      </div>

      {/* Modular Doctor Filters Component */}
      <DoctorFilters
        selectedSpecialty={selectedSpecialty}
        onSpecialtyChange={(spec) => {
          setSelectedSpecialty(spec);
          setPage(1);
        }}
        availableSpecialties={availableSpecialties}
        selectedHospital={selectedHospital}
        onHospitalChange={(hosp) => {
          setSelectedHospital(hosp);
          setPage(1);
        }}
        availableHospitals={availableHospitals}
        datePreset={datePreset}
        onDatePresetChange={(preset) => {
          setDatePreset(preset);
          setPage(1);
        }}
        startDate={startDate}
        onStartDateChange={(start) => {
          setStartDate(start);
          setPage(1);
        }}
        endDate={endDate}
        onEndDateChange={(end) => {
          setEndDate(end);
          setPage(1);
        }}
        hasActiveFilters={hasActiveFilters}
        onResetAll={resetAllFilters}
        totalCount={totalCount}
        filteredCount={doctors.length}
      />

      {/* Loading Bar */}
      {isLoading && (
        <div className="h-1 bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 animate-pulse w-full" />
        </div>
      )}

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && doctors.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
            <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
              <svg className="w-4 h-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading physician records from server...
            </div>
          </div>
        ) : doctors.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-base">No doctors found matching your criteria.</p>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="mt-3 text-sm font-medium text-blue-600 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          doctors.map((doc) => {
            const assignedPatients = patients.filter(
              (p) =>
                p.doctorId === doc.id ||
                (p.doctorName && p.doctorName.toLowerCase().trim() === doc.name.toLowerCase().trim())
            );

            return (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                assignedPatients={assignedPatients}
                onAddPatient={(targetDoc) =>
                  setPatientDoctor({
                    id: targetDoc.id,
                    name: targetDoc.name,
                    specialty: targetDoc.specialty,
                    hospital: targetDoc.hospital,
                    avatar: targetDoc.avatar,
                  })
                }
                onDeletePatient={handleDeletePatient}
                onViewAllPatients={setViewingDoctorPatients}
                onDeleteDoctor={handleDeleteDoctor}
              />
            );
          })
        )}
      </div>

      {/* Modular Pagination Component */}
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

      {/* Add Doctor Modal */}
      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => fetchDoctors()}
      />

      {/* Add Patient Modal under a Doctor */}
      <AddPatientModal
        isOpen={Boolean(patientDoctor)}
        onClose={() => setPatientDoctor(null)}
        doctor={patientDoctor}
        onSuccess={(newPatient) => {
          setPatients((prev) => [newPatient, ...prev]);
        }}
      />

      {/* View All Patients for Doctor Modal */}
      <DoctorPatientsModal
        doctor={viewingDoctorPatients}
        patients={patients}
        onClose={() => setViewingDoctorPatients(null)}
        onDeletePatient={handleDeletePatient}
      />
    </div>
  );
}
