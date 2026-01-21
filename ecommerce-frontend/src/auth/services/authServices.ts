import axios, { type AxiosResponse } from 'axios';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../types';

const AUTH_URL = '/api/auth';

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const res: AxiosResponse<AuthResponse> = await axios.post(
    `${AUTH_URL}/login`,
    credentials,
  );
  return res.data;
};

export const registerUser = async (
  credentials: RegisterCredentials,
): Promise<AuthResponse> => {
  const res: AxiosResponse<AuthResponse> = await axios.post(
    `${AUTH_URL}/register`,
    credentials,
  );
  return res.data;
};
