import { IsUUID } from 'class-validator'
import { User } from 'src/User/domain/User.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Transaction } from './Transaction.entity'

@Entity('subscriptions')
export class Subscription {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  creator: User 

  @ManyToOne(() => User, (user) => user.subscriptions, { eager: true })
  subscriber: User

  @Column({ nullable: true })
  days: number

  @Column({ nullable: true })
  amount: number

  @OneToOne(() => Transaction, (transaction) => transaction.id, { eager: true })
  @JoinColumn()
  transaction: string

  @Column({ nullable: true })
  status: string

  @CreateDateColumn()
  createdAt: Date

  @Column({ type: 'date'})
  endAt: Date
}
