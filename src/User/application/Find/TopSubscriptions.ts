import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/User/domain/User.repository'

@Injectable()
export class TopSubscriptions {
  constructor(private usersRepository: UsersRepository) {}

  async __invoke() {
    const users: any = await this.usersRepository.findAll()

    users.sort((a, b) => a.subscriptions.length > b.subscriptions.length)

    return users.slice(0, 9)
  }
}
