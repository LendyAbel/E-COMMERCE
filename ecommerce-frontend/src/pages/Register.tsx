import { Alert, Box, Button, Input, Typography } from '@mui/material';
import { useRegister } from '../auth/hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { mutate: register, isError, error, isPending } = useRegister();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    register(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
        },
      },
    );
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
      <Typography variant='h4'>Register</Typography>

      {isError && (
        <Alert severity='error'>
          {(error as Error)?.message || 'Registration failed'}
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
        {isPending ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};

export default Register;
