import { Injectable } from '@nestjs/common'
import { PostsRepository } from 'src/Post/domain/Post.repository'

@Injectable()
export class TextPostUpdate {
  constructor(private postsRepository: PostsRepository) {}

  async __invoke({ text, postId }): Promise<void> {
    this.postsRepository.update(postId, { text })
  }
}
