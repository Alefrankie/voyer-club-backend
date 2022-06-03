import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/User/domain/User.repository'

@Injectable()
export class FindAllUsers {
  constructor(private usersRepository: UsersRepository) {}

  __invoke() {
    return this.usersRepository.findAll()
  }
}
