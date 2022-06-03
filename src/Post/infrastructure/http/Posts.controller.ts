import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CommentService } from 'src/Post/application/CommentService'
import { FindPostById } from 'src/Post/application/Find/FindPostById'
import { FindPosts } from 'src/Post/application/Find/FindPosts'
import { LikeService } from 'src/Post/application/LikeService'
import { RemovePostById } from 'src/Post/application/Remove/RemovePostById'
import { TextPostUpdate } from 'src/Post/application/Update/TextPostUpdate'

@Controller('/posts')
export class PostsController {
  constructor(
    private findPostById: FindPostById,
    private findPosts: FindPosts,
    private commentService: CommentService,
    private likeService: LikeService,
    private removePostById: RemovePostById,
    private txtPostUpdate: TextPostUpdate
  ) {}

  @Get('/users/:id')
  async getAll(@Param('id') id: string) {
    const data = await this.findPosts.__invoke(id)
    return data
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.findPostById.__invoke(id)
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    await this.removePostById.__invoke(id)
    return { message: 'Resource removed' }
  }

  @Post('/:postId/comments')
  async addComment(@Param('postId') postId: string, @Body() body: any) {
    const { text, userId } = body
    return await this.commentService.add({ text, userId, postId })
  }

  @Delete('/:postId/comments/:commentId')
  async removeComment(@Param() body) {
    const { commentId, postId } = body

    return await this.commentService.remove(postId, commentId)
  }
  @Post('/likes')
  async switchLike(@Body() body: any) {
    return await this.likeService.__invoke(body)
  }

  @Put('/:postId')
  async updatePost(@Param() { postId }, @Body() { text }) {
    await this.txtPostUpdate.__invoke({ postId, text })

    return { status: 'updated' }
  }
}
