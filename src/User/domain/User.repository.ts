import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { SignUpDto } from '../application/Create/SignUp.dto'
import { User } from './User.entity'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findById(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['rate', 'subscriptions', 'posts', 'chats']
    })
  }

  async findOneByFilter(filter: string, key: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { [filter]: key },
      relations: ['rate', 'subscriptions', 'posts', 'chats']
    })
  }

  async findAllByFilter(filter: string, key: string): Promise<User[]> {
    return await this.usersRepository.find({ where: { [filter]: key } })
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['posts'] })
  }

  async filter(key: string): Promise<User[]> {
    return await this.usersRepository.find({
      where: [
        { username: Like(`%${key}%`) },
        { firstName: Like(`%${key}%`) },
        { lastName: Like(`%${key}%`) }
      ]
    })
  }

  async create(body: SignUpDto) {
    const newData: any = this.usersRepository.create(body)

    newData.username.toUpperCase()
    await this.usersRepository.save(newData)

    const dataCreated = await this.usersRepository.findOne(newData.id)

    return dataCreated
  }
  async update(id: string, body: any) {
    const data: User = await this.usersRepository.findOne(id)
    this.usersRepository.merge(data, body)
    return this.usersRepository.save(data)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
