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

@Entity('withdrawal')
export class Withdrawal {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string
}