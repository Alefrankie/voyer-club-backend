import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Like } from './Like.entity'

@Injectable()
export class LikesRepository {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>
  ) {}

  async findLike(user, post): Promise<Like> {
    return await this.likesRepository.findOne({
      where: { user, post }
    })
  }

  async create(body: any) {
    const newData = this.likesRepository.create(body)

    return await this.likesRepository.save(newData)
  }

  async remove(id: string): Promise<void> {
    await this.likesRepository.delete(id)
  }
}
