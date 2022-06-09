import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../Domain/user.schema'

class CreateUserDto {
  email: string
  password: string
  roles: any[] = []
  isEnabled?: boolean = true
}

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createCatDto)
    return createdCat.save()
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find()
  }

  async findSuggestions(): Promise<User[]> {
    return await this.userModel.find()
  }

  run() {
    return 'Hello World!'
  }
}
