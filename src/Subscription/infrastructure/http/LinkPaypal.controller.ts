import { Body, Controller, Post } from '@nestjs/common'
import { LinkPaypal } from 'src/Subscription/application/LinkPaypal/LinkPaypal'

@Controller()
export class LinkPaypalController {
  constructor(private linkSubscription: LinkPaypal) {}

  @Post('/api/subscription/link')
  async link(@Body() body: any) {
    const url = await this.linkSubscription.link(body)
    return {url}
  }

  @Post('/api/subscription/checkpay')
  async checkPay(@Body() body: any) {
    const check = await this.linkSubscription.checkPay(body)
    return {check}
  }
}
