import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/users/types/user.type';

export const UserData = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user as UserPayload;
  },
);