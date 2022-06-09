import { Controller, Get, Logger, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): any {
    Logger.log(request.headers, 'Request Headers')
    response.cookie('user', 'userId', {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      path: '/',
      domain: 'localhost',
      sameSite: 'lax',
    })
    return this.appService.getHello()
  }
  @Get('/test')
  getHello2(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): any {
    console.log(request.cookies)

    // parse cookie

    // response.clearCookie('user')
    return 'request'
  }
}
