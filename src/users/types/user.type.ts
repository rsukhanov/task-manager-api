import { User } from '@prisma/client';

export type UserEntity = Omit<User, 'password'>;

export type UserPayload = {
  id: string;
  email: string;
};