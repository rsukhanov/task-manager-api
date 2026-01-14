import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/users/types/user.type';

export const UserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserPayload; 
  },
);