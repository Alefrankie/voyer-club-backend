import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from 'src/User/domain/User.repository'
import { recovery } from 'src/Shared/infrastructure/utils/email'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class ForgetPassword {
  constructor(private usersRepository: UsersRepository) {}

  async recovery(body) {
    const user: any = await this.usersRepository.findOneByFilter(
      'username',
      body.username
    )

    if (!user) {
      throw new NotFoundException('Usuario no Encontrado')
    }

    const newPassword = this.generateRandomString(5)
    const userUpdated = this.usersRepository.update(user.id, {
      password: bcrypt.hashSync(newPassword, 10)
    })
    recovery(user.email, newPassword)
    return userUpdated
  }

  private generateRandomString(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result1 = ''
    for (let i = 0; i < num; i++) {
      result1 += characters.charAt(
        Math.floor(Math.random() * characters.length)
      )
    }

    return result1
  }
}
