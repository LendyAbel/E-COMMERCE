import { Alert, Box, Button, Input, Typography } from '@mui/material';
import { useLogin } from '../auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useNotificationContext } from '../notifications/hooks/useNotification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setNotification } = useNotificationContext();

  const { mutateAsync: login, isPending, isError, error } = useLogin();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
      setNotification(`Login Error: ${error}`, 'success');
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
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
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type='submit' variant='contained' disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default Login;
