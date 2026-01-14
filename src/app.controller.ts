import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getServerStatus(): { status: 'ok' } {
    return {status: 'ok'};
  }
}
