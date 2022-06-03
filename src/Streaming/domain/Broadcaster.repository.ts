import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { Broadcaster } from './Broadcaster.entity'

@Injectable()
export class BroadcastersRepository {
  constructor(
    @InjectRepository(Broadcaster)
    private broadcasterRepository: Repository<Broadcaster>
  ) {}

  async findById(id: string): Promise<Broadcaster> {
    return await this.broadcasterRepository.findOne({ where: { id } })
  }

  findByFilter(filter: string, key: string): Promise<Broadcaster> {
    return this.broadcasterRepository.findOne({ where: { [filter]: key } })
  }

  findAllByFilter(filter: string, key: string): Promise<Broadcaster> {
    return this.broadcasterRepository.findOne({ where: { [filter]: key } })
  }

  async findAll(): Promise<Broadcaster[]> {
    return await this.broadcasterRepository.find({ relations: ['user'] })
  }

  async findAllLike(filter: string, key: string): Promise<Broadcaster[]> {
    return await this.broadcasterRepository.find({
      [filter]: Like(`%${key}%`)
    })
  }

  async create(body: any) {
    const newData = this.broadcasterRepository.create(body)

    return await this.broadcasterRepository.save(newData)
  }
  async update(id: string, body: any) {
    const data: Broadcaster = await this.broadcasterRepository.findOne(id)
    this.broadcasterRepository.merge(data, body)
    return this.broadcasterRepository.save(data)
  }

  async remove(id: string): Promise<void> {
    await this.broadcasterRepository.delete(id)
  }
}
