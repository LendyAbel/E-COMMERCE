import axios, { type AxiosResponse } from 'axios';
import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
} from '../types';
import axiosInstance from '../../lib/axiosInstance';

const AUTH_URL = '/api/auth';

export const loginUser = async (
    credentials: LoginCredentials,
): Promise<AuthResponse> => {
    try {
        const res: AxiosResponse<AuthResponse> = await axiosInstance.post(
            `${AUTH_URL}/login`,
            credentials,
        );
        return res.data;
    } catch (error) {
        let errorMessage = '';
        if (axios.isAxiosError(error)) {
            const responseData = error.response?.data.error;
            errorMessage += responseData;
        }
        console.error('Error registering user:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const registerUser = async (
    credentials: RegisterCredentials,
): Promise<AuthResponse> => {
    try {
        const res: AxiosResponse<AuthResponse> = await axiosInstance.post(
            `${AUTH_URL}/register`,
            credentials,
        );
        return res.data;
    } catch (error: unknown) {
        let errorMessage = '';
        if (axios.isAxiosError(error)) {
            const responseData = error.response?.data.error;
            errorMessage += responseData;
        }
        console.error('Error registering user:', errorMessage);
        throw new Error(errorMessage);
    }
};
