import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { FindLastMessages } from 'src/Chat/application/Find/FindLastMessage'
import { FindOneChat } from 'src/Chat/application/Find/FindOneChat'
import { CreateMessage } from 'src/Chat/application/SendMessage'
import { DeleteMessage } from 'src/Chat/application/Update/DeleteMessage'
import { MarkRead } from 'src/Chat/application/Update/MarkRead'

interface Notification {
  from: string
  to: string
}
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server

  constructor(
    private findLastMessages: FindLastMessages,
    private findOneChat: FindOneChat,
    private createMessage: CreateMessage,
    private markRead: MarkRead,
    private deleteMessage: DeleteMessage
  ) {}

  @SubscribeMessage('fetch-chats')
  async fetchingChats(@MessageBody() id: string): Promise<any> {
    const data = await this.findLastMessages.__invoke(id)

    return data
  }
  @SubscribeMessage('fetch-messages')
  async fetchingMessages(@MessageBody() body: string): Promise<any> {
    const data = await this.findOneChat.__invoke(body)
    this.markRead.one(body)
    return data
  }

  @SubscribeMessage('send-message')
  async sendMessage(@MessageBody() body: any): Promise<any> {
    const messageCreated = this.createMessage.__invoke(body)

    return messageCreated
  }
  @SubscribeMessage('delete-message')
  async deleteMsg(@MessageBody() body: any): Promise<any> {
    const { messageId, sessionId } = body
    this.deleteMessage.__invoke(messageId, sessionId)
  }

  @SubscribeMessage('notify-new-message')
  async notifyNewMessage(
    @MessageBody() body: Notification,
    @ConnectedSocket() client: Socket
  ): Promise<any> {
    client.broadcast.emit('notify-new-message', body)
  }

  @SubscribeMessage('mark-all-read')
  async markAllRead(@MessageBody() id: Notification): Promise<any> {
    await this.markRead.all(id)
  }
}
