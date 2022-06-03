import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from 'src/User/domain/IJwtPayload'
import { User } from 'src/User/domain/User.entity'
import { UsersRepository } from 'src/User/domain/User.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UsersRepository) {
    super({
      secretOrKey: 'super-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload
    const user = this.usersRepository.findOneByFilter('username', username)

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
