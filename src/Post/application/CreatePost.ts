import { Injectable } from '@nestjs/common'
import { PostsRepository } from 'src/Post/domain/Post.repository'

@Injectable()
export class CreatePost {
  constructor(private postsRepository: PostsRepository) {}

  __invoke(body: any) {

    return this.postsRepository.create(body)
  }
}
