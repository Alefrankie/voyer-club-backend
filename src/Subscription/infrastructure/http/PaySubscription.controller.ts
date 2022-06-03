import { Body, Controller, Post } from '@nestjs/common'
import { PaySubscription } from 'src/Subscription/application/PaySubscription/PaySubscription'
import { PaySubscriptionDto } from 'src/Subscription/application/PaySubscription/PaySubscription.dto'

@Controller('/api/subscription/pay')
export class PaySubscriptionController {
  constructor(private paySubscription: PaySubscription) {}

  @Post()
  async save(@Body() body: PaySubscriptionDto) {
    return await this.paySubscription.pay(body)
  }
}