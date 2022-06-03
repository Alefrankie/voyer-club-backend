import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './Comment.entity'

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>
  ) {}

  async findOne(userId, postId): Promise<Comment> {
    return await this.repository.findOne({
      where: { user: userId, post: postId }
    })
  }

  async create(body: any) {
    const newData = this.repository.create(body)

    const dataCreated: any = await this.repository.save(newData)

    return await this.repository.findOne({ where: { id: dataCreated.id } })
    // return this.repository.find(dataCreated.id)
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id)
  }
  async update(id: string, body: any) {
    const data: Comment = await this.repository.findOne(id)
    this.repository.merge(data, body)
    return this.repository.save(data)
  }
}
