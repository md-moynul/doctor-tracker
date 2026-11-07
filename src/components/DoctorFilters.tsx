"use client";

interface DoctorFiltersProps {
  selectedSpecialty: string;
  onSpecialtyChange: (specialty: string) => void;
  availableSpecialties: string[];

  selectedHospital: string;
  onHospitalChange: (hospital: string) => void;
  availableHospitals: string[];

  datePreset: string;
  onDatePresetChange: (preset: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;

  hasActiveFilters: boolean;
  onResetAll: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function DoctorFilters({
  selectedSpecialty,
  onSpecialtyChange,
  availableSpecialties,
  selectedHospital,
  onHospitalChange,
  availableHospitals,
  datePreset,
  onDatePresetChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  hasActiveFilters,
  onResetAll,
  totalCount,
  filteredCount,
}: DoctorFiltersProps) {
  // Ensure "All" is always first
  const specialties = [
    "All",
    ...availableSpecialties.filter((s) => s.toLowerCase() !== "all"),
  ];

  return (
    <div className="space-y-3">
      {/* 1. Specialty Fast-Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {specialties.map((spec) => {
          const isSelected = selectedSpecialty.toLowerCase() === spec.toLowerCase();
          return (
            <button
              key={spec}
              type="button"
              onClick={() => onSpecialtyChange(spec)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-blue-600 text-white shadow-xs shadow-blue-500/30 font-semibold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {spec}
            </button>
          );
        })}
      </div>

      {/* 2. Compact Advanced Toolbar: Date & Hospital */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Label */}
          <div className="flex items-center gap-1.5 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="hidden sm:inline">Filters:</span>
          </div>

          {/* Date Filter Dropdown */}
          <select
            value={datePreset}
            onChange={(e) => {
              onDatePresetChange(e.target.value);
              if (e.target.value !== "custom") {
                onStartDateChange("");
                onEndDateChange("");
              }
            }}
            className={`h-8 px-2.5 text-xs font-medium rounded-lg border focus:outline-none transition-colors cursor-pointer ${
              datePreset !== "all"
                ? "bg-blue-50 border-blue-300 text-blue-700 font-semibold"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <option value="all">Registration: All Dates</option>
            <option value="today">Registered: Today</option>
            <option value="7days">Registered: Last 7 Days</option>
            <option value="month">Registered: This Month</option>
            <option value="custom">Registered: Custom Range...</option>
          </select>

          {/* Hospital / Clinic Dropdown */}
          <select
            value={selectedHospital}
            onChange={(e) => onHospitalChange(e.target.value)}
            className={`h-8 px-2.5 text-xs font-medium rounded-lg border focus:outline-none transition-colors max-w-[200px] truncate cursor-pointer ${
              selectedHospital !== "All"
                ? "bg-blue-50 border-blue-300 text-blue-700 font-semibold"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <option value="All">Hospital: All Facilities</option>
            {availableHospitals.map((hosp) => (
              <option key={hosp} value={hosp}>
                {hosp}
              </option>
            ))}
          </select>
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center gap-3 text-xs text-slate-500 ml-auto">
          <span>
            Showing <strong className="text-slate-800 font-semibold">{filteredCount}</strong> of{" "}
            {totalCount} physicians
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* 3. Custom Date Range Pickers (only shown when custom range is active) */}
      {datePreset === "custom" && (
        <div className="flex flex-wrap items-center gap-2 p-2 bg-blue-50/60 rounded-xl border border-blue-100 text-xs animate-in fade-in duration-150">
          <span className="font-semibold text-blue-800">Date Range:</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">From:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="px-2 py-1 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none text-slate-700"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">To:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="px-2 py-1 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none text-slate-700"
            />
          </div>
          {(startDate || endDate) && (
            <button
              type="button"
              onClick={() => {
                onStartDateChange("");
                onEndDateChange("");
              }}
              className="text-xs text-rose-600 hover:underline ml-2"
            >
              Reset dates
            </button>
          )}
        </div>
      )}
    </div>
  );
}

