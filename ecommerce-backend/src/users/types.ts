export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

export type NewUser = Omit<User, 'id'>;

export type PublicUser = Omit<User, 'passwordHash'>;

export interface AuthResponse {
  user: PublicUser;
  token: string;
}

export interface RegisterBody {
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface LoginBody {
  email: string;
  password: string;
}