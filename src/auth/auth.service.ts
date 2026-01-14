import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { UserEntity } from 'src/users/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return this.usersService.extractUserEntity(user);
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  async register(dto: CreateUserDto) {
    const isEmailAlreadyUsing = await this.usersService.findByEmail(dto.email);
    if (isEmailAlreadyUsing) {
      throw new UnauthorizedException('Email is already in use');
    }

    const newUser = await this.usersService.create(dto);
    return this.usersService.extractUserEntity(newUser);
  }
}