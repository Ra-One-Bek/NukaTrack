export interface LoginResponse {
  access_token: string;
}

export interface MeResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
}