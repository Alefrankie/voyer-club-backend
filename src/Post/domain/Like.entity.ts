import { IsString, IsUUID } from 'class-validator'
import { User } from 'src/User/domain/User.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post.entity'

@Entity('likes')
export class Like {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsString()
  @ManyToOne(() => User, (user) => user, { eager: true })
  user: User

  @ManyToOne(() => Post, (post) => post.likes, { eager: true })
  post: Post
}
