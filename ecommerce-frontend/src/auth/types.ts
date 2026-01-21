export type UserRole = 'admin' | 'user';

export interface PublicUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: PublicUser;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  role?: UserRole;
}
