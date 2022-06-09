import { Controller, Get, Logger, Query, Req, Res } from '@nestjs/common'
import cookie from 'cookie'
import { Request, Response } from 'express'
import { UserService } from '../Application/user.service'
import { User } from '../Domain/user.schema'

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get()
  test(): Promise<User[]> {
    return this.userService.findAll()
  }
  @Get('/sign-in')
  signIn(@Res({ passthrough: true }) response: Response): any {
    response.cookie(
      'user',
      {
        _id: '1',
        firstName: 'Alefrank',
        lastName: 'Martínez',
        username: 'Diwaii',
        profilePhoto: '',
      },
      {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        path: '/',
      },
    )
    return {
      data: 'authenticated',
      message: 'authenticated',
    }
  }
  @Get('/sign-out')
  signOut(@Res({ passthrough: true }) response: Response): any {
    response.clearCookie('user')
    return {
      data: 'authenticated',
      message: 'authenticated',
    }
  }
  @Get('/filter')
  filter(@Query() { key }: { key: string }) {
    return this.userService.findSuggestions()
  }

  @Get('/suggestions/')
  suggestions(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): any {
    // request.cookies?.user?.id

    // const suggestions = [
    //   {
    //     _id: '1',
    //     firstName: 'Alefrank',
    //     lastName: 'Martínez',
    //     username: 'Diwaii',
    //     profilePhoto: '',
    //   },
    //   {
    //     _id: '2',
    //     firstName: 'José',
    //     lastName: 'Theis',
    //     username: 'JoseT',
    //     profilePhoto: '',
    //   },
    // ]

    // TODO: get suggestions from database
    // Cantidad de seguidores
    // Cantidad de seguidos
    // Cantidad de amigos
    // Puntuación

    return this.userService.findSuggestions()
  }
}
