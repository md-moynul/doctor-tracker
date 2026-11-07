"use client";

import { useState, useEffect } from "react";
import { updatePatient, PatientResponse } from "@/lib/patient";
import { getAllDoctors, DoctorResponse } from "@/lib/doctor";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any | null;
  onSuccess?: (updatedPatient: PatientResponse) => void;
}

const BLOOD_GROUPS = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const GENDERS = ["Male", "Female", "Other"];
const STATUSES = ["Outpatient", "Admitted", "Discharged"];

export default function EditPatientModal({
  isOpen,
  onClose,
  patient,
  onSuccess,
}: EditPatientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    bloodGroup: "O+",
    condition: "",
    phone: "",
    status: "Outpatient",
    hospital: "",
    doctorId: "",
    doctorName: "",
    department: "",
  });

  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Populate form with patient data when opened
  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || "",
        age: patient.age ? String(patient.age) : "",
        gender: patient.gender || "Male",
        bloodGroup: patient.bloodGroup && patient.bloodGroup !== "N/A" ? patient.bloodGroup : "O+",
        condition: patient.condition || "",
        phone: patient.phone || "",
        status: patient.status || "Outpatient",
        hospital: patient.hospital || "",
        doctorId: patient.doctorId || "",
        doctorName: patient.doctorName || (patient.doctor ? patient.doctor.replace(/^Dr\.\s*/i, "") : ""),
        department: patient.department || "",
      });
      setErrorMessage("");
    }
  }, [patient]);

  // Fetch doctors list for doctor reassignment dropdown
  useEffect(() => {
    if (!isOpen) return;

    const fetchDoctorsList = async () => {
      try {
        setIsLoadingDoctors(true);
        const res = await getAllDoctors();
        if (res.success && Array.isArray(res.data)) {
          setDoctors(res.data);
        }
      } catch {
        // Soft fail - can still edit patient with current doctor
      } finally {
        setIsLoadingDoctors(false);
      }
    };

    fetchDoctorsList();
  }, [isOpen]);

  if (!isOpen || !patient) return null;

  const handleDoctorChange = (selectedDocId: string) => {
    const selectedDoc = doctors.find((d) => d._id === selectedDocId);
    if (selectedDoc) {
      setFormData((prev) => ({
        ...prev,
        doctorId: selectedDoc._id,
        doctorName: selectedDoc.name,
        department: selectedDoc.specialization,
        hospital: selectedDoc.hospital || prev.hospital,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.age || !formData.condition.trim()) {
      setErrorMessage("Please fill in required fields (Name, Age, Condition).");
      return;
    }

    const patientId = patient._id || patient.id;
    if (!patientId) {
      setErrorMessage("Patient ID is missing. Cannot update.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await updatePatient(patientId, {
        name: formData.name.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        condition: formData.condition.trim(),
        phone: formData.phone.trim() || undefined,
        status: formData.status,
        hospital: formData.hospital.trim() || undefined,
        doctorId: formData.doctorId || undefined,
        doctorName: formData.doctorName.trim() || undefined,
        department: formData.department.trim() || undefined,
      });

      if (res.success && res.data) {
        if (onSuccess) {
          onSuccess(res.data);
        }
        onClose();
      } else {
        setErrorMessage(res.message || "Failed to update patient record.");
      }
    } catch (err: any) {
      setErrorMessage(
        err?.data?.message || err?.message || "Failed to update patient. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Edit Patient Information</h3>
            <p className="text-xs text-slate-500">Update medical and clinical records</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
            {errorMessage}
          </div>
        )}

        {/* Patient Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Name & Age */}
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

          {/* Gender, Blood Group & Status */}
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

          {/* Condition / Diagnosis */}
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

          {/* Assigned Doctor & Hospital */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assigned Doctor
              </label>
              {doctors.length > 0 ? (
                <select
                  value={formData.doctorId}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  <option value="">{formData.doctorName ? `Current: Dr. ${formData.doctorName}` : "Select a doctor"}</option>
                  {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      Dr. {doc.name.replace(/^Dr\.\s*/i, "")} ({doc.specialization})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={formData.doctorName}
                  onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hospital / Clinic
              </label>
              <input
                type="text"
                placeholder="e.g. Central Memorial Hospital"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          {/* Contact Phone */}
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
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs shadow-blue-500/30 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

