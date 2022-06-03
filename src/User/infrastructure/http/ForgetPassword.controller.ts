import { Body, Controller, Post } from '@nestjs/common'
import { ForgetPassword } from 'src/User/application/Update/ForgotPassword'

@Controller('/users/forget-password')
export class ForgetPasswordController {
  constructor(private forgetPassword: ForgetPassword) {}

  @Post()
  async run(@Body() body: any) {
    return await this.forgetPassword.recovery(body)
  }
}
