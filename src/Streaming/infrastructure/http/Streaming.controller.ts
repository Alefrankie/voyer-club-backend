import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { StreamingService } from 'src/Streaming/application/Streaming.service'
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Controller('/streaming')
export class StreamingController {
  senderStream: any = null

  // eslint-disable-next-line prettier/prettier
  constructor(private streamingService: StreamingService) {}

  @Get('/active')
  async active() {
    const broadcasters = await this.streamingService.findAll()
    console.log(broadcasters)
    return {
      status: 'success',
      message: 'All active broadcasters retrieved!',
      payload: broadcasters
    }
  }

  @Get('/:socketId')
  async socketId(@Param('socketId') socketId: string) {
    const broadcaster = await this.streamingService.findOne(socketId)
    return {
      status: 'success',
      message: `Broadcaster ${socketId} retrieved!`,
      payload: broadcaster
    }
  }

  @Post('/new/')
  async newSocket(@Body() body: any) {
    const response = await this.streamingService.create(body)
    return {
      status: 'success',
      message: `New broadcaster, ${body.username} created!`,
      payload: response
    }
  }
}
