import { Injectable } from '@nestjs/common'
import { CommentsRepository } from 'src/Post/domain/Comment.Repository'
import { LikesRepository } from 'src/Post/domain/Like.Repository'
import { PostsRepository } from 'src/Post/domain/Post.repository'

@Injectable()
export class RemovePostById {
  constructor(
    private postsRepository: PostsRepository,
    private commentsRepository: CommentsRepository,
    private likesRepository: LikesRepository
  ) {}

  async __invoke(postId: string) {
    const currentPost = await this.postsRepository.findById(postId)

    for await (const comment of currentPost.comments) {
      this.commentsRepository.remove(comment.id)
    }

    for await (const like of currentPost.likes) {
      this.likesRepository.remove(like.id)
    }

    return this.postsRepository.remove(postId)
  }
}
