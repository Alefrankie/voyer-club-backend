import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { UsersRepository } from 'src/User/domain/User.repository'
import { SignUpDto } from './SignUp.dto'

@Injectable()
export class SignUp {
  constructor(private usersRepository: UsersRepository) {}

  async __invoke(body: SignUpDto) {
    const usernameFound = await this.usersRepository.findOneByFilter(
      'username',
      body.username
    )

    const emailFound = await this.usersRepository.findOneByFilter(
      'email',
      body.email
    )

    if (usernameFound || emailFound)
      throw new ConflictException('Usted ya se encuentra registrado')

    body.password = bcrypt.hashSync(body.password, 10)
    return await this.usersRepository.create(body)
  }
}
