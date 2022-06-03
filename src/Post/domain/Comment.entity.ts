import { IsString, IsUUID } from 'class-validator'
import { User } from 'src/User/domain/User.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post.entity'

@Entity('comments')
export class Comment {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsString()
  @Column({ nullable: true })
  text: string

  @IsString()
  @ManyToOne(() => User, (user) => user, { eager: true })
  user: User

  @ManyToOne(() => Post, (post) => post.likes, { eager: true })
  post: Post

  @CreateDateColumn({ nullable: true })
  createdAt: Date
}
