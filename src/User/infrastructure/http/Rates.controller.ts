import { Body, Controller, Post } from '@nestjs/common'
import { CreateRate } from 'src/User/application/Create/CreateRate/CreateRate'

@Controller('/api/rates')
export class RatesController {
  constructor(private createRate: CreateRate) {}

  @Post()
  async save(@Body() body: any) {
    return await this.createRate.__invoke(body)
  }
}
