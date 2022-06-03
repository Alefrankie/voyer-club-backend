import { IsUUID } from 'class-validator'
import { Rate } from 'src/User/domain/Rate.entity'
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
import { Withdrawal } from './Witdrawal.entity'

@Entity('transactions')
export class Transaction {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  creator: User

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  subscriber: User
 
  @ManyToOne(() => Rate, (rate) => rate.id, { eager: true })
  rate: Rate
  
  @Column({ nullable: true })
  amount: number
  
  @CreateDateColumn()
  date: Date

  @ManyToOne(() => Withdrawal, (withdrawal) => withdrawal.id, { eager: true })
  withdrawal: Withdrawal
  
  @Column({ nullable: true })
  isWithdrawal: string
}