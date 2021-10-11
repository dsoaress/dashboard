import { Controller, Get } from '@nestjs/common'

import { Public } from './common/decorators/public-route.decorator'

@Controller()
export class AppController {
  @Public()
  @Get()
  getStatus() {
    return '🚀 running'
  }
}
