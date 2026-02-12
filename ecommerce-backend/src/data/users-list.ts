import type { User } from '../users/types';

export const users: User[] = [
  {
    id: 'c2f10b34-bdcd-46da-b770-9e91a425af09',
    email: 'admin@test.com',
    passwordHash:
      '$2b$10$/1iTC3p.L6rD1FMEPDjLROfMDHsrRHbZ.BXht2MLk8Yrv0ydvzthu',
    role: 'admin',
  },
  {
    id: 'cad24f15-14da-46e3-8460-12ddfa2ee689',
    email: 'user@test.com',
    passwordHash:
      '$2b$10$IapfL60NBGdbBU0CI6V0ouRIn4qyR8YVmIPW034Cv7MKVzFKM69IG',
    role: 'user',
  },
];
