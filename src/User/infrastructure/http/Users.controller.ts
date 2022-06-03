import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { SignUp } from 'src/User/application/Create/SignUp'
import { SignUpDto } from 'src/User/application/Create/SignUp.dto'
import { FindAllUsers } from 'src/User/application/Find/FindAllUsers'
import { FilterUsers } from 'src/User/application/Find/FilterUsers'
import { FindUserById } from 'src/User/application/Find/FindUserById'
import { UpdateProfile } from 'src/User/application/Update/UpdateProfile'
import { TopSubscriptions } from 'src/User/application/Find/TopSubscriptions'

@Controller('/users')
export class UsersController {
  constructor(
    private signUp: SignUp,
    private findAllUsers: FindAllUsers,
    private findUserById: FindUserById,
    private updateProfile: UpdateProfile,
    private filterUsers: FilterUsers,
    private topSubscriptions: TopSubscriptions
  ) {}

  @Post('/')
  async create(@Body() body: SignUpDto) {
    return await this.signUp.__invoke(body)
  }

  @Get('/')
  getAll() {
    return this.findAllUsers.__invoke()
  }

  @Get('/:id')
  getById(@Param() params: { id: string }) {
    const { id } = params
    return this.findUserById.__invoke(id)
  }

  @Get('/filter/:key')
  async filter(@Param('key') key: string) {
    const data = await this.filterUsers.__invoke(key.toUpperCase())
    return data
  }

  @Delete('/:id')
  deleteById() {
    // Waiting
  }

  @Post('/users/update-profile/')
  update(@Body() body: any) {
    return this.updateProfile.update(body)
  }

  @Post('/users/update-password/')
  password(@Body() body: any) {
    return this.updateProfile.password(body)
  }
  @Get('/top-subscriptions')
  subscriptions() {
    return this.topSubscriptions.__invoke()
  }
}
