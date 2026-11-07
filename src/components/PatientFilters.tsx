"use client";

interface PatientFiltersProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
  statusCounts: {
    All: number;
    Admitted: number;
    Outpatient: number;
    Discharged: number;
  };

  conditionFilter: string;
  onConditionChange: (condition: string) => void;
  availableConditions: string[];

  departmentFilter: string;
  onDepartmentChange: (department: string) => void;
  availableDepartments: string[];

  bloodGroupFilter: string;
  onBloodGroupChange: (bloodGroup: string) => void;

  genderFilter: string;
  onGenderChange: (gender: string) => void;

  datePreset: string;
  onDatePresetChange: (preset: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;

  searchQuery: string;
  onClearSearch: () => void;

  hasActiveFilters: boolean;
  onResetAll: () => void;

  totalCount: number;
  filteredCount: number;
}

const BLOOD_GROUPS = ["All", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const GENDERS = ["All", "Male", "Female", "Other"];
const STATUS_TABS = ["All", "Admitted", "Outpatient", "Discharged"] as const;

export default function PatientFilters({
  statusFilter,
  onStatusChange,
  statusCounts,
  conditionFilter,
  onConditionChange,
  availableConditions,
  departmentFilter,
  onDepartmentChange,
  availableDepartments,
  bloodGroupFilter,
  onBloodGroupChange,
  genderFilter,
  onGenderChange,
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
}: PatientFiltersProps) {
  return (
    <div className="space-y-3">
      {/* Top Bar: Status Tabs + Result Counter + Reset Action */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {STATUS_TABS.map((tab) => {
            const count = statusCounts[tab];
            const isSelected = statusFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onStatusChange(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs shadow-blue-500/30"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center gap-3 text-xs text-slate-500 ml-auto">
          <span>
            Showing <strong className="text-slate-800">{filteredCount}</strong> of {totalCount} patients
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Compact Filters Row */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
        {/* Filter Label Icon */}
        <div className="flex items-center gap-1.5 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="hidden sm:inline">Filters:</span>
        </div>

        {/* 1. Date Filter Dropdown */}
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
          <option value="all">Date: All</option>
          <option value="today">Date: Today</option>
          <option value="7days">Date: Last 7 Days</option>
          <option value="month">Date: This Month</option>
          <option value="custom">Date: Custom Range...</option>
        </select>

        {/* 2. Condition Filter Dropdown */}
        <select
          value={conditionFilter}
          onChange={(e) => onConditionChange(e.target.value)}
          className={`h-8 px-2.5 text-xs font-medium rounded-lg border focus:outline-none transition-colors max-w-[170px] truncate cursor-pointer ${
            conditionFilter !== "All"
              ? "bg-blue-50 border-blue-300 text-blue-700 font-semibold"
              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <option value="All">Condition: All</option>
          {availableConditions.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </select>

        {/* 3. Department Filter Dropdown */}
        <select
          value={departmentFilter}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className={`h-8 px-2.5 text-xs font-medium rounded-lg border focus:outline-none transition-colors max-w-[160px] truncate cursor-pointer ${
            departmentFilter !== "All"
              ? "bg-blue-50 border-blue-300 text-blue-700 font-semibold"
              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <option value="All">Dept: All</option>
          {availableDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* 4. Blood Group Dropdown */}
        <select
          value={bloodGroupFilter}
          onChange={(e) => onBloodGroupChange(e.target.value)}
          className={`h-8 px-2.5 text-xs font-medium rounded-lg border focus:outline-none transition-colors cursor-pointer ${
            bloodGroupFilter !== "All"
              ? "bg-rose-50 border-rose-300 text-rose-700 font-bold"
              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <option value="All">Blood: All</option>
          {BLOOD_GROUPS.filter((b) => b !== "All").map((bg) => (
            <option key={bg} value={bg}>
              Blood: {bg}
            </option>
          ))}
        </select>

        {/* 5. Gender Dropdown */}
        <select
          value={genderFilter}
          onChange={(e) => onGenderChange(e.target.value)}
          className={`h-8 px-2.5 text-xs font-medium rounded-lg border focus:outline-none transition-colors cursor-pointer ${
            genderFilter !== "All"
              ? "bg-blue-50 border-blue-300 text-blue-700 font-bold"
              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <option value="All">Gender: All</option>
          {GENDERS.filter((g) => g !== "All").map((g) => (
            <option key={g} value={g}>
              Gender: {g}
            </option>
          ))}
        </select>

        {/* Clear All Inline Action (if active) */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetAll}
            className="h-8 px-2.5 text-xs font-medium text-slate-400 hover:text-rose-600 transition-colors ml-auto cursor-pointer"
            title="Clear all filters"
          >
            Clear
          </button>
        )}
      </div>

      {/* Custom Date Range Pickers (only shown when Custom Range is active) */}
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
              className="text-xs text-rose-600 hover:underline ml-2 cursor-pointer"
            >
              Reset dates
            </button>
          )}
        </div>
      )}
    </div>
  );
}
