import { IsString, IsUUID } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from '../../User/domain/User.entity'
import { Comment } from './Comment.entity'
import { Like } from './Like.entity'

@Entity('posts')
export class Post {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsString()
  @Column({ nullable: true })
  src: string

  @IsString()
  @Column({ nullable: true })
  text: string

  @Column({ nullable: true })
  status: string

  @CreateDateColumn({ nullable: true })
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.posts)
  user: User

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[]

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]
}
