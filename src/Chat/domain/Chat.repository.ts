import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { Chat } from './Chat.entity'
import { Message } from './Message.entity'

@Injectable()
export class ChatsRepository {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    @InjectRepository(Chat) private chatsRepository: Repository<Chat>
  ) {}

  async findById(id: string): Promise<Message> {
    return await this.messagesRepository.findOne({ where: { id } })
  }

  findByFilter(filter: string, key: string): Promise<Message> {
    return this.messagesRepository.findOne({ where: { [filter]: key } })
  }

  findAllByFilter(filter: string, key: string): Promise<Message> {
    return this.messagesRepository.findOne({ where: { [filter]: key } })
  }

  async findMyMessages(id): Promise<Message[]> {
    return await this.messagesRepository.find({
      where: [{ to: id }, { from: id }]
    })
  }

  async findAll(): Promise<Message[]> {
    return await this.messagesRepository.find({ relations: ['user'] })
  }

  async findLastMessages(id: string): Promise<any[]> {
    const lastMessages: Message[] = []

    const data = await this.messagesRepository.find({
      where: [{ to: id }, { from: id }],
      relations: ['to', 'from']
    })

    const hash = {}
    const auxLastMessage = ''
    const dataFormatted = data
      .reverse()
      .filter((o: any) => (hash[o.from.id] ? false : (hash[o.from.id] = true)))
      .filter((e: any) => e.from.id !== id)

    return dataFormatted
  }

  async findAllLike(filter: string, key: string): Promise<Message[]> {
    return await this.messagesRepository.find({
      [filter]: Like(`%${key}%`)
    })
  }

  async findMessagesWithSomeone({
    sessionId,
    subscriberId
  }: {
    sessionId: string
    subscriberId: string
  }): Promise<Message[]> {
    return await this.messagesRepository.find({
      where: [
        { to: sessionId, from: subscriberId },
        { to: subscriberId, from: sessionId }
      ],
      relations: ['to', 'from']
    })
  }

  async saveMessage(body: Message) {
    const chatCreated = this.chatsRepository.create(body)
    await this.messagesRepository.save(chatCreated)

    // body.chat = chatCreated.id
    const messageCreated = this.messagesRepository.create(body)

    return await this.messagesRepository.save(messageCreated)
  }
  async update(id: string, body: any) {
    const data: Message = await this.messagesRepository.findOne(id)
    this.messagesRepository.merge(data, body)
    return this.messagesRepository.save(data)
  }

  async removeMessage(id: string): Promise<void> {
    await this.messagesRepository.delete(id)
  }
}
