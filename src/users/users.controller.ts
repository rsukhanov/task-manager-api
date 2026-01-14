import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthJwtGuard } from 'src/auth/decorators/auth.decorator';
import { UserData } from 'src/auth/decorators/user-data.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AuthJwtGuard()
  @Get()
  async getUser(
    @UserData() user
  ) {
    const userData = await this.usersService.findOne(user.id);
    return this.usersService.extractUserEntity(userData);
  }
}
