import { Alert, Box, Button, Input, Typography } from '@mui/material';
import { useRegister } from '../auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNotificationContext } from '../notifications/hooks/useNotification';

interface FormData {
    email: string;
    password: string;
}

const Register = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const { setNotification } = useNotificationContext();
    const {
        mutateAsync: registerUser,
        isError,
        error,
        isPending,
    } = useRegister();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
        await registerUser(
            { email, password },
            {
                onSuccess: () => {
                    navigate('/');
                },
            },
        );
        setNotification('Registration Success', 'success');
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
            <Typography variant='h4'>Register</Typography>

            {isError && (
                <Alert severity='error'>
                    {(error as Error)?.message || 'Registration failed'}
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
                {isPending ? 'Registering...' : 'Register'}
            </Button>
        </Box>
    );
};

export default Register;
