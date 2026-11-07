"use client";

import { PatientResponse } from "@/lib/patient";

export interface DoctorItem {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  hospital: string;
  rating: string;
  reviews: string;
  avatar: string;
  about: string;
}

interface DoctorCardProps {
  doctor: DoctorItem;
  assignedPatients: PatientResponse[];
  onAddPatient: (doc: DoctorItem) => void;
  onDeletePatient: (patientId: string, patientName: string) => void;
  onViewAllPatients: (doc: DoctorItem) => void;
  onDeleteDoctor: (doctorId: string) => void;
}

const DEFAULT_AVATAR = (name?: string) =>
  name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0284c7&color=fff&size=128`
    : "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face";

export default function DoctorCard({
  doctor,
  assignedPatients,
  onAddPatient,
  onDeletePatient,
  onViewAllPatients,
  onDeleteDoctor,
}: DoctorCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between">
      <div>
        {/* Doctor Identity */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={doctor.avatar || DEFAULT_AVATAR(doctor.name)}
              alt={doctor.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_AVATAR(doctor.name);
              }}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-lg truncate">{doctor.name}</h3>
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider">{doctor.specialty}</p>
            <p className="text-slate-500 text-xs mt-0.5">{doctor.experience}</p>
          </div>
        </div>

        {/* Doctor Summary / About */}
        <p className="text-slate-600 text-xs mt-4 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          {doctor.about}
        </p>

        {/* Assigned Patients Section */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              Assigned Patients
              <span className="px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded-full text-[10px]">
                {assignedPatients.length}
              </span>
            </span>

            <button
              type="button"
              onClick={() => onAddPatient(doctor)}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              + Add Patient
            </button>
          </div>

          {assignedPatients.length === 0 ? (
            <div className="text-[11px] text-slate-400 py-1.5 px-2 bg-slate-50/60 rounded-lg border border-dashed border-slate-200 text-center">
              No patients assigned under this doctor.
            </div>
          ) : (
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {assignedPatients.slice(0, 3).map((pat) => (
                <div
                  key={pat._id}
                  className="flex items-center justify-between text-xs p-1.5 bg-slate-50 hover:bg-slate-100/80 rounded-lg transition-colors border border-slate-100"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="font-semibold text-slate-800 truncate block">
                      {pat.name}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {pat.age} yrs • {pat.condition}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {pat.status || "Outpatient"}
                    </span>
                    <button
                      type="button"
                      onClick={() => onDeletePatient(pat._id, pat.name)}
                      title="Delete patient"
                      className="text-slate-400 hover:text-red-600 p-0.5 rounded transition-colors cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {assignedPatients.length > 3 && (
                <button
                  type="button"
                  onClick={() => onViewAllPatients(doctor)}
                  className="text-[11px] text-blue-600 font-semibold hover:underline block text-center w-full pt-1 cursor-pointer"
                >
                  View all {assignedPatients.length} patients →
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="text-slate-500 truncate max-w-[170px]" title={doctor.hospital}>
          Clinic: <strong className="text-slate-700">{doctor.hospital}</strong>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onDeleteDoctor(doctor.id)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Remove Doctor"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

