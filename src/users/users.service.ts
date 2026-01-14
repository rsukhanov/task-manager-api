import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './types/user.type';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    if (!user) return null;
    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ 
      where: { email }
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ 
      where: { id } 
    });
  }

  extractUserEntity(user: User | null): UserEntity | null {
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserEntity;
  }
}