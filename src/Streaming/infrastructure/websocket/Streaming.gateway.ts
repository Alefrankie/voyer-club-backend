import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class StreamingGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('watcher')
  handleWatcher(client: Socket, [broadcasterId]) {
    client.to(broadcasterId).emit('watcher', client.id)
    console.log('other ' + broadcasterId)
    console.log('watcher set', client.id)
    console.log('broadcasterId', broadcasterId)
  }

  @SubscribeMessage('offer')
  handleOffer(client: Socket, [id, message]) {
    client.to(id).emit('offer', client.id, message)
    console.log('offer sent', message)
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, [id, message]) {
    client.to(id).emit('answer', client.id, message)
    console.log('answer sent')
  }

  @SubscribeMessage('candidate')
  handleCandidate(client: Socket, [id, message]) {
    client.to(id).emit('candidate', client.id, message)
    console.log('candidate', message)
  }

  @SubscribeMessage('close')
  handleClose() {
    console.log('closed socket')
  }

  @SubscribeMessage('new-broadcaster')
  handleNewBroadcaster(client: Socket, broadcaster) {
    client.broadcast.emit('active-broadcaster', broadcaster)
    console.log('active-broadcaster emitted')
  }

  @SubscribeMessage('watcher-disconnect')
  handleWatcherDisconnect(@ConnectedSocket() client: Socket) {
    console.log('watcher disconnected')
    client.emit('disconnectPeer', client.id)
  }

  @SubscribeMessage('new message')
  handleNewMessage(client: Socket, data: any) {
    console.log(data.room)
    client.broadcast.to(data.room).emit('receive message', data)
  }

  @SubscribeMessage('room')
  handleRoom(client: Socket, data: any) {
    console.log('room join')
    console.log(data)
    client.join(data.room)
  }

  @SubscribeMessage('leave room')
  handleLeaveRoom(client: Socket, data: any) {
    console.log('leaving room')
    console.log(data)
    client.leave(data.room)
  }

  // @SubscribeMessage('broadcaster:live')
  // handleBroadcasterLive(client: Socket, data: any) {
  //   client.leave(data.room)
  // }
}
