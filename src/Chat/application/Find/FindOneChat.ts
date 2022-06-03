import { Injectable } from '@nestjs/common'
import { ChatsRepository } from 'src/Chat/domain/Chat.repository'

@Injectable()
export class FindOneChat {
  constructor(private chatsRepository: ChatsRepository) {}

  __invoke(body) {
    return this.chatsRepository.findMessagesWithSomeone(body)
  }
}
