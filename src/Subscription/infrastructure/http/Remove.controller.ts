import { Body, Controller, Post } from '@nestjs/common'
import { Remove } from 'src/Subscription/application/Remove'

@Controller()
export class RemoveController {
  constructor(private removeSubscription: Remove) {}

  @Post('/api/user/remove-one')
  remove(@Body() body: any) {
    const { id } = body
    return this.removeSubscription.__invoke(id)
  }
}
