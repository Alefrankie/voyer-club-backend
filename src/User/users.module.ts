import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateRate } from './application/Create/CreateRate/CreateRate'
import { SignUp } from './application/Create/SignUp'
import { FindAllUsers } from './application/Find/FindAllUsers'
import { FilterUsers } from './application/Find/FilterUsers'
import { FindUserById } from './application/Find/FindUserById'
import { JwtStrategy } from './application/SignIn/Jwt.strategy'
import { SignIn } from './application/SignIn/SignIn'
import { ChangePhotos } from './application/Update/ChangePhotos'
import { ForgetPassword } from './application/Update/ForgotPassword'
import { UpdateProfile } from './application/Update/UpdateProfile'
import { Rate } from './domain/Rate.entity'
import { RatesRepository } from './domain/Rate.repository'
import { User } from './domain/User.entity'
import { UsersRepository } from './domain/User.repository'
import { ChangePhotosController } from './infrastructure/http/ChangePhotos.controller'
import { ForgetPasswordController } from './infrastructure/http/ForgetPassword.controller'
import { RatesController } from './infrastructure/http/Rates.controller'
import { SignInController } from './infrastructure/http/SignIn.controller'
import { UsersController } from './infrastructure/http/Users.controller'
import { WhoAmIController } from './infrastructure/http/WhoAmI.controller'
import { TopSubscriptions } from './application/Find/TopSubscriptions'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 3600 * 24
      }
    }),
    TypeOrmModule.forFeature([User, Rate])
  ],
  providers: [
    RatesRepository,
    UsersRepository,
    FindUserById,
    FindAllUsers,
    FilterUsers,
    SignIn,
    SignUp,
    ForgetPassword,
    ChangePhotos,
    JwtStrategy,
    TopSubscriptions,
    //Suggestions
    //Rates
    CreateRate,
    UpdateProfile
  ],
  controllers: [
    SignInController,
    ForgetPasswordController,
    WhoAmIController,
    // Rates
    RatesController,
    ChangePhotosController,
    UsersController
  ]
})
export class UsersModule {}
