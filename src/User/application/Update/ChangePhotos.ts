import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/User/domain/User.repository'

@Injectable()
export class ChangePhotos {
  constructor(private usersRepository: UsersRepository) {}

  __invoke(id, body) {
    return this.usersRepository.update(id, body)
  }
}
