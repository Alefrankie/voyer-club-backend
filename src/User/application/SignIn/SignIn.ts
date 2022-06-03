import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { JwtPayload } from 'src/User/domain/IJwtPayload'
import { User } from 'src/User/domain/User.entity'
import { UsersRepository } from 'src/User/domain/User.repository'
import { SignInDto } from './SignIn.dto'

@Injectable()
export class SignIn {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async __invoke(SignInDto: SignInDto): Promise<{ user: User; token: string }> {
    const { username, password } = SignInDto
    const user: User = await this.usersRepository.findOneByFilter(
      'username',
      username
    )

    if (!user) throw new UnauthorizedException('Please check your credentials')

    const match = bcrypt.compareSync(password, user.password)

    if (!match) throw new UnauthorizedException('Please check your credentials')

    const payload: JwtPayload = { id: user.id, username: user.username }

    this.usersRepository.update(user.id, { online: true })

    const token = await this.jwtService.sign(payload)
    return { user, token }
  }
}
