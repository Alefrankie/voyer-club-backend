import { IsString, IsUUID } from 'class-validator'
import { User } from 'src/User/domain/User.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('messages')
export class Message {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user) => user.messages)
  to: string

  @ManyToOne(() => User, (user) => user.messages)
  from: string

  @IsString()
  @Column({ nullable: true })
  text: string

  @Column({ nullable: true })
  src: string

  @Column({ nullable: true, default: false })
  read: boolean

  @Column({ nullable: true, default: '' })
  deleted: string

  @CreateDateColumn({ nullable: true })
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date
}
