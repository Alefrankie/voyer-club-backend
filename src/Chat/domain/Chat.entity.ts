import { IsUUID } from 'class-validator'
import { User } from 'src/User/domain/User.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('chats')
export class Chat {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user) => user.chats)
  user: string

  @Column('text', { array: true, default: [] })
  members: string[]
}
