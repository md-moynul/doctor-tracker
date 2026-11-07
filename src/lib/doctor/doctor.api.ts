import { feachApi } from '../feachApi';

export interface DoctorInput {
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  image?: string;
}

export interface DoctorResponse {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DoctorQueryParams {
  search?: string;
  specialization?: string;
  specialty?: string;
  hospital?: string;
  datePreset?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface DoctorPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DoctorFilterMeta {
  availableSpecialties: string[];
  availableHospitals: string[];
  totalCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: DoctorPaginationMeta;
  meta?: DoctorFilterMeta;
}

export type PaginatedDoctorResponse = ApiResponse<DoctorResponse[]>;

/**
 * Fetch doctors with optional server-side filtering & pagination
 */
export async function getAllDoctors(
  params?: DoctorQueryParams
): Promise<PaginatedDoctorResponse> {
  return feachApi<PaginatedDoctorResponse>('/doctors', {
    params: params as Record<string, string | number | boolean | undefined>,
  });
}

/**
 * Fetch a single doctor by ID
 */
export async function getDoctorById(id: string): Promise<ApiResponse<DoctorResponse>> {
  return feachApi<ApiResponse<DoctorResponse>>(`/doctors/${id}`);
}

/**
 * Create a new doctor
 */
export async function createDoctor(doctorData: DoctorInput): Promise<ApiResponse<DoctorResponse>> {
  return feachApi<ApiResponse<DoctorResponse>>('/doctor', {
    method: 'POST',
    body: doctorData,
  });
}

