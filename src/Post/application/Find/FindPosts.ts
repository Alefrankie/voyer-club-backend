import { Injectable } from '@nestjs/common'
import { PostsRepository } from 'src/Post/domain/Post.repository'

@Injectable()
export class FindPosts {
  constructor(private postsRepository: PostsRepository) {}

  __invoke(userId) {
    return this.postsRepository.findAll(userId)
  }
}
