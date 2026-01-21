import { users } from '../../data/users-list';
import type { User, NewUser, PublicUser } from '../types';
import { randomUUID } from 'crypto';

const createUser = (data: NewUser): User => {
  const existingUser = users.find(u => u.email === data.email.toLowerCase());
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user: User = {
    id: randomUUID(),
    email: data.email.toLowerCase(),
    passwordHash: data.passwordHash,
    role: data.role,
  };

  users.push(user);
  return user;
};

const getUsers = (): PublicUser[] => {
  return users.map(({ passwordHash, ...user }) => user);
};

const getUserByEmail = (email: string): User | undefined => {
  return users.find(u => u.email === email.toLowerCase());
};

export default { createUser, getUsers, getUserByEmail };
