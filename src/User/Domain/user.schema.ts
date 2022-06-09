import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { ROlES } from 'src/App/Contants/ROLES'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  username: string

  @Prop()
  password: string

  @Prop()
  email: string

  @Prop()
  profilePhoto: string

  @Prop()
  coverPhoto: string

  @Prop({ default: ROlES.USER })
  role: string

  @Prop()
  country: string

  @Prop()
  birthday: string

  @Prop({ default: false })
  authenticated: boolean

  @Prop({ default: false })
  online: boolean

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  suggestions: User[]
}

export const UserSchema = SchemaFactory.createForClass(User)
