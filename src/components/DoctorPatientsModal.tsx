"use client";

import { PatientResponse } from "@/lib/patient";
import { DoctorItem } from "./DoctorCard";

interface DoctorPatientsModalProps {
  doctor: DoctorItem | null;
  patients: PatientResponse[];
  onClose: () => void;
  onDeletePatient: (patientId: string, patientName: string) => void;
}

export default function DoctorPatientsModal({
  doctor,
  patients,
  onClose,
  onDeletePatient,
}: DoctorPatientsModalProps) {
  if (!doctor) return null;

  const assignedPatients = patients.filter(
    (p) =>
      p.doctorId === doctor.id ||
      (p.doctorName && p.doctorName.toLowerCase().trim() === doctor.name.toLowerCase().trim())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Patients for {doctor.name}
            </h3>
            <p className="text-xs text-slate-500">
              {doctor.specialty} • {doctor.hospital}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Patients List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {assignedPatients.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No patients currently assigned to this physician.
            </div>
          ) : (
            assignedPatients.map((p) => (
              <div
                key={p._id}
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{p.name}</div>
                  <div className="text-[11px] text-slate-400">
                    {p.age} yrs • {p.gender} {p.bloodGroup ? `• Blood: ${p.bloodGroup}` : ""}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    <span className="font-medium text-slate-700">Diagnosis:</span> {p.condition}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {p.status || "Outpatient"}
                  </span>
                  <button
                    type="button"
                    onClick={() => onDeletePatient(p._id, p.name)}
                    title="Remove patient from doctor"
                    className="text-slate-400 hover:text-red-600 p-1 rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

