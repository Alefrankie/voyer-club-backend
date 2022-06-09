import { Controller, Get } from '@nestjs/common'
import { Post } from '../Domain/post.schema'

@Controller('/posts')
export class PostController {
  @Get('/')
  getAll(): Post[] {
    // src: string

    // @Prop()
    // text: string

    // @Prop()
    // status: number

    // @Prop()
    // createdAt?: Date

    const posts: Post[] = [
      {
        src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        text: 'Texto',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        text: 'Texto',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        text: 'Texto',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        text: 'Texto',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    return posts
  }
}
