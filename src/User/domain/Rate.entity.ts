import { IsString, IsUUID } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User.entity'

@Entity('rates')
export class Rate {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @IsString()
  @Column({ nullable: true })
  amount: string

  @Column({ nullable: true })
  days: number

  @CreateDateColumn({ nullable: true })
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date
}
