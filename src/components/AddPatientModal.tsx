"use client";

import { useState } from "react";
import { createPatient, PatientResponse } from "@/lib/patient";

export interface TargetDoctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  avatar?: string;
}

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: TargetDoctor | null;
  onSuccess?: (patient: PatientResponse) => void;
}

const BLOOD_GROUPS = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const GENDERS = ["Male", "Female", "Other"];
const STATUSES = ["Outpatient", "Admitted"];

export default function AddPatientModal({
  isOpen,
  onClose,
  doctor,
  onSuccess,
}: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    bloodGroup: "O+",
    condition: "",
    phone: "",
    status: "Outpatient",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen || !doctor) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.age || !formData.condition.trim()) {
      setErrorMessage("Please fill in all required fields (Name, Age, Condition).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await createPatient({
        name: formData.name.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        condition: formData.condition.trim(),
        phone: formData.phone.trim() || undefined,
        status: formData.status,
        doctorId: doctor.id,
        doctorName: doctor.name,
        department: doctor.specialty,
        hospital: doctor.hospital,
      });

      if (res.success && res.data) {
        if (onSuccess) {
          onSuccess(res.data);
        }
        setFormData({
          name: "",
          age: "",
          gender: "Male",
          bloodGroup: "O+",
          condition: "",
          phone: "",
          status: "Outpatient",
        });
        onClose();
      } else {
        setErrorMessage(res.message || "Failed to create patient record.");
      }
    } catch (err: any) {
      setErrorMessage(
        err?.data?.message || err?.message || "Failed to create patient. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Add New Patient</h3>
            <p className="text-xs text-slate-500">Register and assign a patient under this doctor</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Assigned Doctor Banner */}
        <div className="p-3 bg-blue-50/80 border border-blue-100 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-blue-100 shrink-0">
            <img
              src={
                doctor.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=0284c7&color=fff`
              }
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
              Assigned Physician
            </div>
            <div className="text-sm font-bold text-slate-900 truncate">{doctor.name}</div>
            <div className="text-xs text-slate-500 truncate">
              {doctor.specialty} • {doctor.hospital}
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
            {errorMessage}
          </div>
        )}

        {/* Patient Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                max="130"
                placeholder="e.g. 35"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Condition / Diagnosis <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Acute Bronchitis, Follow-up consultation"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contact Phone <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. +1 (555) 987-6543"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Assigning...
                </>
              ) : (
                "Add Patient"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

