import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/User/domain/User.repository'

@Injectable()
export class FilterUsers {
  constructor(private usersRepository: UsersRepository) {}

  async __invoke(key: string) {
    return await this.usersRepository.filter(key)
  }
}
