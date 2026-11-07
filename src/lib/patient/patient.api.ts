import { feachApi } from '../feachApi';

export interface PatientInput {
  name: string;
  age: number | string;
  gender: string;
  bloodGroup?: string;
  condition: string;
  phone?: string;
  status?: string;
  doctorId: string;
  doctorName: string;
  department?: string;
  hospital?: string;
}

export interface PatientResponse {
  _id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup?: string;
  condition: string;
  phone?: string;
  status: string;
  doctorId: string;
  doctorName: string;
  department?: string;
  hospital?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PatientFilterMeta {
  availableConditions: string[];
  availableDepartments: string[];
  statusCounts: {
    All: number;
    Admitted: number;
    Outpatient: number;
    Discharged: number;
  };
}

export interface PatientQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  condition?: string;
  department?: string;
  bloodGroup?: string;
  gender?: string;
  datePreset?: string;
  startDate?: string;
  endDate?: string;
  doctorId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: PaginationMeta;
  meta?: PatientFilterMeta;
}

export type PaginatedPatientResponse = ApiResponse<PatientResponse[]>;

/**
 * Fetch patients with server-side filtering & pagination (supports optional doctorId string or PatientQueryParams object)
 */
export async function getAllPatients(
  params?: string | PatientQueryParams
): Promise<PaginatedPatientResponse> {
  if (typeof params === 'string') {
    const query = params ? `?doctorId=${encodeURIComponent(params)}` : '';
    return feachApi<PaginatedPatientResponse>(`/patients${query}`);
  }

  return feachApi<PaginatedPatientResponse>('/patients', {
    params: params as Record<string, string | number | boolean | undefined>,
  });
}

/**
 * Create a new patient assigned under a specific doctor
 */
export async function createPatient(patientData: PatientInput): Promise<ApiResponse<PatientResponse>> {
  return feachApi<ApiResponse<PatientResponse>>('/patients', {
    method: 'POST',
    body: patientData,
  });
}

/**
 * Delete a patient by ID
 */
export async function deletePatient(id: string): Promise<ApiResponse<{ id: string }>> {
  return feachApi<ApiResponse<{ id: string }>>(`/patients/${id}`, {
    method: 'DELETE',
  });
}

export type UpdatePatientInput = Partial<PatientInput>;

/**
 * Update an existing patient by ID
 */
export async function updatePatient(
  id: string,
  patientData: UpdatePatientInput
): Promise<ApiResponse<PatientResponse>> {
  return feachApi<ApiResponse<PatientResponse>>(`/patients/${id}`, {
    method: 'PATCH',
    body: patientData,
  });
}


