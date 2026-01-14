import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {

  @Get()
  @ApiOperation({ summary: 'Get server status' })
  getServerStatus(): { status: 'ok' } {
    return {status: 'ok'};
  }
}
