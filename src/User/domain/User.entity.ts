import { IsString, IsUUID } from 'class-validator'
import { Chat } from 'src/Chat/domain/Chat.entity'
import { Message } from 'src/Chat/domain/Message.entity'
import { Post } from 'src/Post/domain/Post.entity'
import { Subscription } from 'src/Subscription/domain/Subscription.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Rate } from './Rate.entity'

@Entity('users')
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsString()
  @Column({ nullable: true })
  firstName: string

  @IsString()
  @Column({ nullable: true })
  lastName: string

  @IsString()
  @Column({ nullable: true })
  username: string

  @Column({ nullable: true })
  password: string

  @Column({ nullable: true })
  email: string

  @IsString()
  @Column({ nullable: true })
  profilePhoto: string

  @IsString()
  @Column({ nullable: true })
  coverPhoto: string

  @Column({ default: 2 })
  privilege: string

  @Column({ nullable: true })
  paypal: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  date: string

  @Column({ nullable: true })
  authenticatedCode: string

  @Column({ default: false })
  authenticated: string

  @Column({ default: false })
  online: boolean

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn()
  posts: Post[]

  @OneToOne(() => Rate, (rate) => rate.user)
  rate: Rate

  @OneToMany(() => Subscription, (subscription) => subscription.subscriber)
  subscriptions: Subscription[]
  
  @OneToMany(() => Message, (message) => message)
  messages: Message[]

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[]
}
