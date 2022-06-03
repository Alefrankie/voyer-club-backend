import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/User/domain/User.repository'
import * as bcrypt from 'bcryptjs'
import { UnauthorizedException } from '@nestjs/common'

@Injectable()
export class UpdateProfile {
  constructor(private usersRepository: UsersRepository) {}

  update(body: any) {
    return this.usersRepository.update(body.id, body)
  }

  async password(body: any) {

    const user = await this.usersRepository.findOneByFilter(
      'id',
      body.id
    )
    if (!user) throw new UnauthorizedException('El usuario no existe')
    /* const match = bcrypt.compareSync(body.passNew, user.password)
    if (!match) throw new UnauthorizedException('Contraseña incorrecta') */
    
    const hashPassNew = bcrypt.hashSync(body.passNew, 10)
    const userUpdated = this.usersRepository.update(body.id, {
      password: hashPassNew
    })
    return { user }
  }
}

//L2OOD
