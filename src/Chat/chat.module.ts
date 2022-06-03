import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FindLastMessages } from './application/Find/FindLastMessage'
import { FindOneChat } from './application/Find/FindOneChat'
import { RemoveMessage } from './application/Remove/RemoveMessage'
import { CreateMessage } from './application/SendMessage'
import { DeleteMessage } from './application/Update/DeleteMessage'
import { MarkRead } from './application/Update/MarkRead'
import { Chat } from './domain/Chat.entity'
import { ChatsRepository } from './domain/Chat.repository'
import { Message } from './domain/Message.entity'
import { ChatGateway } from './infrastructure/websocket/Chat.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat])],
  providers: [
    ChatsRepository,
    FindLastMessages,
    FindOneChat,
    RemoveMessage,
    DeleteMessage,
    CreateMessage,
    ChatGateway,
    MarkRead
  ],
  controllers: []
})
export class ChatModule {}
