import { Alert, Box, Button, Input, Typography } from '@mui/material';
import { useLogin } from '../auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useNotificationContext } from '../notifications/hooks/useNotification';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const { setNotification } = useNotificationContext();
    const navigate = useNavigate();
    const { mutateAsync: login, isPending, isError, error } = useLogin();

    const onSubmit: SubmitHandler<FormData> = ({ email, password }) => {
        try {
            login(
                { email, password },
                {
                    onSuccess: () => {
                        navigate('/');
                    },
                },
            );
            setNotification('Login Success', 'success');
        } catch (error) {
            setNotification(`Login Error: ${error}`, 'error');
        }
    };

    return (
        <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: 400,
                margin: 'auto',
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant='h4'>Login</Typography>

            {isError && (
                <Alert severity='error'>
                    {(error as Error)?.message || 'Login failed'}
                </Alert>
            )}

            <Input
                type='email'
                placeholder='Email'
                {...register('email', { required: true })}
                required
            />
            <Input
                type='password'
                placeholder='Password'
                {...register('password', { required: true })}
                required
            />
            <Button type='submit' variant='contained' disabled={isPending}>
                {isPending ? 'Logging in...' : 'Login'}
            </Button>
        </Box>
    );
};

export default Login;
