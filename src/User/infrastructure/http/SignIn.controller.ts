import { Body, Controller, Post } from '@nestjs/common'
import { SignIn } from 'src/User/application/SignIn/SignIn'
import { SignInDto } from 'src/User/application/SignIn/SignIn.dto'

@Controller('/users/sign-in')
export class SignInController {
  constructor(private signIn: SignIn) {}

  @Post()
  async run(@Body() signInDto: SignInDto) {
    return await this.signIn.__invoke(signInDto)
  }
}
