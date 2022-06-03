import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../domain/Chat.repository'

@Injectable()
export class CreateMessage {
  constructor(
    private chatsRepository: ChatsRepository,
  ) {}

  async __invoke(body: any) {
    return this.chatsRepository.saveMessage(body)
  }
}
