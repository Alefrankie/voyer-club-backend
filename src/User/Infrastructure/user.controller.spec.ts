import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '../Application/user.service'
import { User, UserSchema } from '../Domain/user.schema'
import { UserController } from './user.controller'

describe('AppController', () => {
  let userController: UserController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: jest.fn() },
      ],
    }).compile()

    userController = app.get<UserController>(UserController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userController.getHello()).toBe('Hello World!')
    })
  })
})
