import { Injectable } from '@nestjs/common'
import { PostsRepository } from 'src/Post/domain/Post.repository'

@Injectable()
export class FindPostById {
  constructor(private postsRepository: PostsRepository) {}

  __invoke(id) {
    return this.postsRepository.findById(id)
  }
}
