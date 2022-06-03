import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/User/domain/User.entity'
import { Like, Not, Repository } from 'typeorm'
import { Subscription } from './Subscription.entity'
import { Transaction } from './Transaction.entity'

@Injectable()
export class SubscriptionsRepository {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findById(id: string): Promise<Subscription> {
    return await this.subscriptionRepository.findOne({ where: { id } })
  }

  async findOneByFilter(filter: string, key: string): Promise<Subscription> {
    return await this.subscriptionRepository.findOne({
      where: { [filter]: key },
      relations: ['rate']
    })
  }

  async findAllByFilter(filter: string, key: string): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({ where: { [filter]: key } })
  }

  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({ relations: ['posts'] })
  }

  async findMySubscribers({
    subscriberId
  }: {
    subscriberId: string
  }): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({
      where: { subscriber: subscriberId }
    })
  }

  async findAllLike(filter: string, key: string): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({
      [filter]: Like(`%${key}%`)
    })
  }

  async findSuggestions(userId): Promise<any> {
    const subscriptions = await this.subscriptionRepository.find({
      where: { creator: userId }
    })

    let users = await this.userRepository.find()

    for await (const sub of subscriptions) {
      users = users.filter((user: any) => user.id !== sub.subscriber)
    }

    return users
  } 

  async create(body: any) {
    const newDataTransaction: any = this.transactionRepository.create(body)
    await this.transactionRepository.save(newDataTransaction)
    /* body.transaction = newDataTransaction.id
    const newDataSubscription: any = this.subscriptionRepository.create(body)
    await this.subscriptionRepository.save(newDataSubscription) */

    /* return dataCreated */
    await this.remove(newDataTransaction.id)
    return "nei"
  }
  async update(id: string, body: any) {
    const data: Subscription = await this.subscriptionRepository.findOne(id)
    this.subscriptionRepository.merge(data, body)
    return this.subscriptionRepository.save(data)
  }

  async remove(id: string): Promise<void> {
    await this.subscriptionRepository.delete(id)
  }

  async removeAll(id: string): Promise<void> {
    await this.subscriptionRepository.delete(id)
  }
}
