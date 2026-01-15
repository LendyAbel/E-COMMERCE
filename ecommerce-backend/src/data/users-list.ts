import type { User } from '../users/types';

export const users: User[] = [
  {
    id: '5470d77b-0d74-45c0-bdc7-13c0af969be6',
    email: 'admin@test.com',
    passwordHash:
      '$2b$10$ZxSkeLRiuULpVc2LLpPtre/QkRL47969gTaD8A5swNd2S2bs/6dXO',
    role: 'admin',
  },
  {
    id: '6b3f2a67-480f-4658-95e1-779b6d4b76a7',
    email: 'user@test.com',
    passwordHash:
      '$2b$10$Ybyj17pc3zNZM.mjC6GqdO37FT6G3dZUsHYOE4vVE0.NyHH/sp55u',
    role: 'user',
  },
];
