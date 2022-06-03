import { Injectable } from '@nestjs/common'
import { ChatsRepository } from 'src/Chat/domain/Chat.repository'

@Injectable()
export class MarkRead {
  constructor(private chatsRepository: ChatsRepository) {}

  async all(sessionId) {
    const chats = await this.chatsRepository.findMyMessages(sessionId)

    for await (const item of chats) {
      this.chatsRepository.update(item.id, { read: true })
    }
  }

  async one({ sessionId, subscriberId }: any) {
    const chats: any = await this.chatsRepository.findMessagesWithSomeone({
      sessionId,
      subscriberId
    })
    
    for await (const item of chats) {
      if(item.from.id === subscriberId){
        this.chatsRepository.update(item.id, { read: true })
      }
    }
  }
}
