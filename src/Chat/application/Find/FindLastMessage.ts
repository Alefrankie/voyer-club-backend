import { Injectable } from '@nestjs/common'
import { ChatsRepository } from 'src/Chat/domain/Chat.repository'

@Injectable()
export class FindLastMessages {
  constructor(private chatsRepository: ChatsRepository) {}

  __invoke(id: string) {
    return this.chatsRepository.findLastMessages(id)
  }
}
