"use client";

import { useState } from "react";

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  hospital: string;
  fee: string;
  rating: string;
  reviews: string;
  status: "Available Today" | "In Surgery" | "Off Duty";
  avatar: string;
  about: string;
}

const INITIAL_DOCTORS: Doctor[] = [
  {
    id: "DOC-01",
    name: "Dr. Sarah Smith",
    title: "Senior Cardiologist",
    specialty: "Cardiology",
    experience: "14 Years Exp.",
    hospital: "St. Mary's Memorial Hospital",
    fee: "$120",
    rating: "4.9",
    reviews: "184",
    status: "Available Today",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    about: "Specializing in cardiovascular health, heart failures, and preventive cardiology treatments.",
  },
  {
    id: "DOC-02",
    name: "Dr. Tanvir Hasan",
    title: "Chief Neurologist",
    specialty: "Neurology",
    experience: "11 Years Exp.",
    hospital: "City Central Neuro Clinic",
    fee: "$150",
    rating: "4.8",
    reviews: "142",
    status: "Available Today",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
    about: "Expert in neuro-diagnostics, migraines, epilepsy, and neuromuscular rehabilitation.",
  },
  {
    id: "DOC-03",
    name: "Dr. Ayesha Siddiqua",
    title: "Pediatric Specialist",
    specialty: "Pediatrics",
    experience: "8 Years Exp.",
    hospital: "Children's Health Pavilion",
    fee: "$90",
    rating: "5.0",
    reviews: "210",
    status: "Available Today",
    avatar: "https://images.unsplash.com/photo-1594824813628-9a40a0279644?w=200&h=200&fit=crop&crop=face",
    about: "Caring child physician focusing on child nutrition, developmental milestones, and immunization.",
  },
  {
    id: "DOC-04",
    name: "Dr. Michael Chen",
    title: "Consultant Orthopedic Surgeon",
    specialty: "Orthopedics",
    experience: "16 Years Exp.",
    hospital: "Metro Joint & Spine Center",
    fee: "$160",
    rating: "4.7",
    reviews: "98",
    status: "In Surgery",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
    about: "Advanced sports injuries, arthroscopic surgeries, joint replacement, and fracture care.",
  },
  {
    id: "DOC-05",
    name: "Dr. Elena Rostova",
    title: "Clinical Dermatologist",
    specialty: "Dermatology",
    experience: "9 Years Exp.",
    hospital: "Aesthetic Skin & Laser Institute",
    fee: "$110",
    rating: "4.9",
    reviews: "165",
    status: "Off Duty",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    about: "Clinical dermatology, skin disorders, eczema, psoriasis, and cosmetic laser therapy.",
  },
  {
    id: "DOC-06",
    name: "Dr. David Rahman",
    title: "Internal Medicine Specialist",
    specialty: "General Medicine",
    experience: "12 Years Exp.",
    hospital: "Prime Care Medical Unit",
    fee: "$80",
    rating: "4.8",
    reviews: "230",
    status: "Available Today",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face",
    about: "Comprehensive disease prevention, hypertension, diabetes management, and annual health checkups.",
  },
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Doctor Form State
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    title: "",
    specialty: "Cardiology",
    experience: "",
    hospital: "",
    fee: "",
    about: "",
    status: "Available Today" as Doctor["status"],
  });

  const specialties = [
    "All",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "General Medicine",
  ];

  const handleStatusChange = (id: string, newStatus: Doctor["status"]) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: newStatus } : doc))
    );
  };

  const handleDeleteDoctor = (id: string) => {
    if (confirm("Are you sure you want to remove this physician from the roster?")) {
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.title) return;

    const createdDoctor: Doctor = {
      id: `DOC-0${doctors.length + 1}`,
      name: newDoctor.name,
      title: newDoctor.title,
      specialty: newDoctor.specialty,
      experience: newDoctor.experience || "1 Year Exp.",
      hospital: newDoctor.hospital || "Central Medical Facility",
      fee: newDoctor.fee.startsWith("$") ? newDoctor.fee : `$${newDoctor.fee || "100"}`,
      rating: "5.0",
      reviews: "1",
      status: newDoctor.status,
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
      about: newDoctor.about || "General practitioner specializing in patient healthcare.",
    };

    setDoctors([createdDoctor, ...doctors]);
    setIsAddModalOpen(false);
    setNewDoctor({
      name: "",
      title: "",
      specialty: "Cardiology",
      experience: "",
      hospital: "",
      fee: "",
      about: "",
      status: "Available Today",
    });
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesQuery =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "All" || doc.specialty === selectedSpecialty;

    return matchesQuery && matchesSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Hospital Staff Roster
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Doctors Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Administrator console to track physician schedules, departments, and consultation availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search input */}
          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              placeholder="Search doctor or specialty..."
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

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="whitespace-nowrap px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-xs shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Doctor
          </button>
        </div>
      </div>

      {/* Specialty Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {specialties.map((spec) => (
          <button
            key={spec}
            type="button"
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              selectedSpecialty === spec
                ? "bg-blue-600 text-white shadow-xs shadow-blue-500/30"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-base">No doctors found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("All");
              }}
              className="mt-3 text-sm font-medium text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-white ${
                        doc.status === "Available Today"
                          ? "bg-emerald-500"
                          : doc.status === "In Surgery"
                          ? "bg-rose-500"
                          : "bg-slate-400"
                      }`}
                      title={doc.status}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                        {doc.specialty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteDoctor(doc.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded-md transition-colors"
                        title="Remove Doctor"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 truncate mt-0.5">{doc.name}</h3>
                    <p className="text-xs text-slate-500">{doc.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{doc.experience}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                  {doc.about}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="truncate">
                    <span className="font-medium text-slate-700">Clinic:</span> {doc.hospital}
                  </div>
                </div>
              </div>

              {/* Status and Fee footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Consultation Fee</span>
                  <div className="text-base font-bold text-slate-900">{doc.fee}</div>
                </div>

                {/* Admin Status Dropdown */}
                <select
                  value={doc.status}
                  onChange={(e) => handleStatusChange(doc.id, e.target.value as Doctor["status"])}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border focus:outline-none transition-colors cursor-pointer ${
                    doc.status === "Available Today"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : doc.status === "In Surgery"
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <option value="Available Today">Available Today</option>
                  <option value="In Surgery">In Surgery</option>
                  <option value="Off Duty">Off Duty</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Doctor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add New Doctor</h3>
                <p className="text-xs text-slate-500">Register a physician into the hospital roster</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Doctor Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. John Watson"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Specialty</label>
                  <select
                    value={newDoctor.specialty}
                    onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    {specialties.filter((s) => s !== "All").map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Chief of Cardiology"
                    value={newDoctor.title}
                    onChange={(e) => setNewDoctor({ ...newDoctor, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    placeholder="10 Years Exp."
                    value={newDoctor.experience}
                    onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hospital / Clinic</label>
                  <input
                    type="text"
                    placeholder="Main Surgery Wing"
                    value={newDoctor.hospital}
                    onChange={(e) => setNewDoctor({ ...newDoctor, hospital: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fee ($)</label>
                  <input
                    type="text"
                    placeholder="120"
                    value={newDoctor.fee}
                    onChange={(e) => setNewDoctor({ ...newDoctor, fee: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={newDoctor.status}
                  onChange={(e) => setNewDoctor({ ...newDoctor, status: e.target.value as Doctor["status"] })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  <option value="Available Today">Available Today</option>
                  <option value="In Surgery">In Surgery</option>
                  <option value="Off Duty">Off Duty</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
