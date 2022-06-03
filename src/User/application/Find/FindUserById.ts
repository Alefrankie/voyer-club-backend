import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/User/domain/User.repository'

@Injectable()
export class FindUserById {
  constructor(private usersRepository: UsersRepository) {}

  __invoke(id) {
    return this.usersRepository.findById(id)
  }
}
