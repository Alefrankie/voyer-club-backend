import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/User/domain/User.repository'

@Injectable()
export class UpdatePassword {
  constructor(private usersRepository: UsersRepository) {}

  __invoke(id: string, password: string) {
    return this.usersRepository.update(id, password)
  }
}
