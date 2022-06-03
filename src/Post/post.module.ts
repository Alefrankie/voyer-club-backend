import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/User/domain/User.entity'
import { UsersRepository } from 'src/User/domain/User.repository'
import { CommentService } from './application/CommentService'
import { CreatePost } from './application/CreatePost'
import { FindPostById } from './application/Find/FindPostById'
import { FindPosts } from './application/Find/FindPosts'
import { FindUserPosts } from './application/Find/FindUserPosts'
import { LikeService } from './application/LikeService'
import { RemovePostById } from './application/Remove/RemovePostById'
import { TextPostUpdate } from './application/Update/TextPostUpdate'
import { Comment } from './domain/Comment.entity'
import { CommentsRepository } from './domain/Comment.Repository'
import { Like } from './domain/Like.entity'
import { LikesRepository } from './domain/Like.Repository'
import { Post } from './domain/Post.entity'
import { PostsRepository } from './domain/Post.repository'
import { CreatePostController } from './infrastructure/http/CreatePost.controller'
import { PostsController } from './infrastructure/http/Posts.controller'
import { PostGateway } from './infrastructure/websocket/Posts.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([Post, Like, Comment, User])],
  providers: [
    PostsRepository,
    UsersRepository,
    LikesRepository,
    CommentsRepository,
    FindPostById,
    FindPosts,
    FindUserPosts,
    LikeService,
    CommentService,
    PostGateway,
    RemovePostById,
    CreatePost,
    TextPostUpdate
  ],
  controllers: [CreatePostController, PostsController]
})
export class PostsModule {}
