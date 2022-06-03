import { Injectable } from '@nestjs/common'
import { ChatsRepository } from 'src/Chat/domain/Chat.repository'

@Injectable()
export class RemoveMessage {
  constructor(private chatsRepository: ChatsRepository) {}

  __invoke(messageId) {
    return this.chatsRepository.removeMessage(messageId)
  }
}
