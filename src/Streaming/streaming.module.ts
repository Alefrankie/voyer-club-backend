import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StreamingService } from './application/Streaming.service'
import { Broadcaster } from './domain/Broadcaster.entity'
import { BroadcastersRepository } from './domain/Broadcaster.repository'
import { StreamingController } from './infrastructure/http/Streaming.controller'
import { StreamingGateway } from './infrastructure/websocket/Streaming.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([Broadcaster])],
  providers: [BroadcastersRepository, StreamingGateway, StreamingService],
  controllers: [StreamingController]
})
export class StreamingModule {}
