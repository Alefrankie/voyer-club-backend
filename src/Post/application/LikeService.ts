import { Injectable } from '@nestjs/common'
import { LikesRepository } from '../domain/Like.Repository'
import { PostsRepository } from '../domain/Post.repository'

@Injectable()
export class LikeService {
  constructor(
    private likesRepository: LikesRepository,
    private postsRepository: PostsRepository
  ) {}

  async __invoke(body): Promise<any> {
    const { user, post } = body
    const likeFound = await this.likesRepository.findLike(user, post)

    if (likeFound) {
      await this.likesRepository.remove(likeFound.id)
      return await this.postsRepository.findById(post)
    }

    await this.likesRepository.create(body)

    return await this.postsRepository.findById(post)
  }
}
