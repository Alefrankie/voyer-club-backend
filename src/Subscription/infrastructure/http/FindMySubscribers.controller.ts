import { Controller, Get } from '@nestjs/common'
import { FindMySubscribers } from 'src/Subscription/application/Find'

@Controller('/api/subscription/find-all')
export class FindMySubscribersController {
  constructor(private findMySubscribers: FindMySubscribers) {}

  @Get()
  getAll() {
    return this.findMySubscribers.__invoke()
  }
}
