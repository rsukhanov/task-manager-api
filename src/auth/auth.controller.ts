import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  async register(
    @Body() createUserDto: CreateUserDto
  ) {
    const newUserEntity = await this.authService.register(createUserDto);
    if (!newUserEntity) {
      throw new UnauthorizedException('Registration failed');
    }
    return newUserEntity;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login (get JWT token)' })
  @ApiResponse({ status: 200, description: 'Token successfully obtained' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(
    @Body() loginDto: LoginDto
  ) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = await this.authService.login(user);
    return token;
  }
}