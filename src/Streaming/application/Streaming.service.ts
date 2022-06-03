import { Injectable } from '@nestjs/common'
import { Broadcaster } from '../domain/Broadcaster.entity'
import { BroadcastersRepository } from '../domain/Broadcaster.repository'

@Injectable()
export class StreamingService {
  constructor(private repository: BroadcastersRepository) {}

  async findOne(id: string) {
    return await this.repository.findById(id)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async create(body) {
    return await this.repository.create(body)
  }

  async getMessages(userId: string) {
    return userId
  }

  // async saveMessage({ streaming_id, session_id, content }) {
  //   const newMessage = new StreamingChats();

  //   newMessage.session_id = session_id;
  //   newMessage.content = content;
  //   newMessage.streaming_id = streaming_id;

  //   return await this.streamingChatsRepository.save(newMessage);

  // }
}
