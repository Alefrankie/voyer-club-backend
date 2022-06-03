import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/User/domain/User.repository'

@Injectable()
export class Remove {
  constructor(private usersRepository: UsersRepository) {}

  __invoke(id) {
    return this.usersRepository.remove(id)
  }
}
