import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
  @Prop()
  src: string

  @Prop()
  text: string

  @Prop()
  status: number

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)

// @ManyToOne(() => User, (user) => user.posts)
// user: User

// @OneToMany(() => Like, (like) => like.post)
// likes: Like[]

// @OneToMany(() => Comment, (comment) => comment.post)
// comments: Comment[]
