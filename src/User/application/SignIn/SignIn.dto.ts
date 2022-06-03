import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 16)
  username: string

  @IsNotEmpty()
  @Length(2, 20)
  password: string
 
  @Length(2, 20)
  socketId: string

  @IsNotEmpty()
  @IsEmail()
  email: string
}
