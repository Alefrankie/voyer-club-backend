import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CommentService } from 'src/Post/application/CommentService'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class PostGateway {
  @WebSocketServer()
  server: Server

  constructor(private commentService: CommentService) {}

  @SubscribeMessage('posts:remove')
  async postRemove(@MessageBody() postId: any): Promise<any> {
    this.server.emit('posts:removed', postId)
  }

  // LIKES
  @SubscribeMessage('posts:like')
  async like(@MessageBody() postUpdated: any): Promise<any> {
    this.server.emit('posts:liked', postUpdated)
  }

  // COMMENTS
  @SubscribeMessage('comments:add')
  async addComment(@MessageBody() post: string): Promise<any> {
    this.server.emit('comments:added', post)
  }

  @SubscribeMessage('comments:remove')
  async remove(@MessageBody() post: any): Promise<any> {
    this.server.emit('comments:removed', post)
  }

  @SubscribeMessage('posts:update-comment')
  async updateComment(@MessageBody() body: any): Promise<any> {
    const { text, userId, postId, commentId } = body
    await this.commentService.update({ text, userId, postId, commentId })
  }

  @SubscribeMessage('posts:notification')
  async notification(
    @MessageBody() session: any,
    @ConnectedSocket() client: Socket
  ): Promise<any> {
    client.broadcast.emit('posts:notification', session)
  }
}
