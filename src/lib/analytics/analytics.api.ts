import { feachApi } from '../feachApi';

export interface DoctorPatientCount {
  doctor: string;
  shortName: string;
  patients: number;
  specialty: string;
  hospital: string;
  doctorId?: string;
}

export interface DateBasedStat {
  date: string;
  displayDate: string;
  total: number;
  admitted: number;
  outpatient: number;
  discharged: number;
}

export interface CategoryStat {
  name: string;
  count: number;
}

export interface RecentPatient {
  _id: string;
  name: string;
  age: number | string;
  gender: string;
  bloodGroup?: string;
  condition: string;
  phone?: string;
  status: string;
  doctorId: string;
  doctorName: string;
  department: string;
  hospital?: string;
  createdAt?: string;
}

export interface ActiveDoctor {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone?: string;
  email?: string;
  image?: string;
  patientCount: number;
}

export interface DashboardAnalyticsData {
  totalDoctors: number;
  totalPatients: number;
  patientsPerDoctor: DoctorPatientCount[];
  dateBasedStats: DateBasedStat[];
  departmentStats: CategoryStat[];
  statusStats: CategoryStat[];
  recentPatients?: RecentPatient[];
  activeDoctors?: ActiveDoctor[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getDashboardAnalytics(): Promise<ApiResponse<DashboardAnalyticsData>> {
  return feachApi<ApiResponse<DashboardAnalyticsData>>('/analytics/dashboard');
}
