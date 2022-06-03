import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/User/application/SignIn/get-user.decorator'
import { User } from 'src/User/domain/User.entity'

@Controller('/users/who-am-i')
export class WhoAmIController {
  @Get()
  @UseGuards(AuthGuard())
  run(@GetUser() user: User) {
    return { user }
  }
}
