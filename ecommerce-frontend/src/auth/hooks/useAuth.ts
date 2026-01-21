import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from './useAuthContext';
import { loginUser, registerUser } from '../services/authServices';
import type { LoginCredentials, RegisterCredentials } from '../types';

export const useLogin = () => {
  const { login } = useAuthContext();
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: data => {
      login(data.user, data.token);
    },
  });
};

export const useRegister = () => {
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => registerUser(credentials),
    onSuccess: data => {
      login(data.user, data.token);
    },
  });
};
