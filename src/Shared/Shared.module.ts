import { Module } from '@nestjs/common'
import { FileServerController } from './infrastructure/http/FileServer.controller'

@Module({
  imports: [
  ],
  providers: [
  ],
  controllers: [
    FileServerController
  ]
})
export class SharedModule {}
