import { Injectable } from '@nestjs/common'
import { CommentsRepository } from '../domain/Comment.Repository'
import { PostsRepository } from '../domain/Post.repository'

@Injectable()
export class CommentService {
  constructor(
    private repository: CommentsRepository,
    private postsRepository: PostsRepository
  ) {}

  async add(body): Promise<any> {
    const { userId, postId, text } = body
    await this.repository.create({ text, user: userId, post: postId })
    return await this.postsRepository.findById(postId)
  }

  async remove(postId, commentId) {
    await this.repository.remove(commentId)
    return await this.postsRepository.findById(postId)
  }

  async update(body): Promise<void> {
    const { text, userId, postId, commentId } = body
    this.repository.update(commentId, { text, user: userId, post: postId })
  }
}
