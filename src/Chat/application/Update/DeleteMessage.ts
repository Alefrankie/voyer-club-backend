import { Injectable } from '@nestjs/common'
import { ChatsRepository } from 'src/Chat/domain/Chat.repository'

@Injectable()
export class DeleteMessage {
  constructor(private chatsRepository: ChatsRepository) {}

  async __invoke(messageId, sessionId) {
    const msg = await this.chatsRepository.findById(messageId)

    if(msg.deleted.includes(sessionId)) return msg

    return this.chatsRepository.update(messageId, {
      deleted: `${sessionId}&${msg.deleted}`.trim()
    })
  }
}
