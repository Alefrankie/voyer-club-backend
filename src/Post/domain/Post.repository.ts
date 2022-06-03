import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from 'src/User/domain/User.repository'
import { Repository } from 'typeorm'
import { Post } from './Post.entity'

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private usersRepository: UsersRepository
  ) {}

  async findById(id: string): Promise<Post> {
    const post: any = await this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'likes', 'comments']
    })

    if (post.src) {
      post.extension = post.src.slice(post.src.lastIndexOf('.'))
    }

    // Last Like
    if (post.likes.length > 0) {
      post.lastUser = post.likes[post.likes.length - 1].user
    }
    // Second last Like
    if (post.likes.length > 1) {
      post.secondLastUser = post.likes[post.likes.length - 2].user
    }

    return post
  }

  async findAll(userId): Promise<any> {
    const sessionPosts = await this.findUserPosts(userId)
    const { subscriptions } = await this.usersRepository.findById(userId)

    const posts: any = []

    for await (const post of sessionPosts) {
      posts.push(post)
    }

    const mockedSubscriptions = [{ id: 'e09c2f33-049c-4900-8a0e-29585dd6f33d' }]
    for await (const { id } of mockedSubscriptions) {
      const subscriptionsPosts: any = await this.findUserPosts(id)

      subscriptionsPosts.map((item) => {
        posts.push(item)
      })
    }

    posts.forEach((item) => {
      if (item.src) {
        item.extension = item.src.slice(item.src.lastIndexOf('.'))
      }

      // Last Like
      if (item.likes.length > 0) {
        item.lastUser = item.likes[item.likes.length - 1].user
      }
      // Second last Like
      if (item.likes.length > 1) {
        item.secondLastUser = item.likes[item.likes.length - 2].user
      }
    })

    return posts.sort((a, b) => a.createdAt > b.createdAt)
  }

  async findUserPosts(id: string): Promise<Post[]> {
    return await this.postsRepository.find({
      where: { user: id },
      relations: ['user', 'likes', 'comments']
    })
  }

  async create(body: Post) {
    const newData = this.postsRepository.create(body)

    return await this.postsRepository.save(newData)
  }
  async update(id: string, body: any) {
    const data: Post = await this.postsRepository.findOne(id)
    this.postsRepository.merge(data, body)
    return this.postsRepository.save(data)
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id)
  }
}
