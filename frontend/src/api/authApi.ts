import { apiFetch } from './client';
import type { LoginResponse, MeResponse } from '../types/auth';

export async function registerUser(data: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMe(): Promise<MeResponse> {
  return apiFetch<MeResponse>('/auth/me');
}