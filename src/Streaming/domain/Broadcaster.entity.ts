import { IsUUID } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from '../../User/domain/User.entity'

@Entity('broadcasters')
export class Broadcaster {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User)
  userId: User

  @OneToOne(() => User)
  socketId: string

  @Column({ nullable: true })
  title: string

  @Column({ nullable: true })
  description: string

  @CreateDateColumn({ nullable: true })
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date
}
