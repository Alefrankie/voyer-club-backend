import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './App/app.module'
import * as cookieParser from 'cookie-parser'

const PORT = 3001
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  const options = {
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: 'http://localhost:3000',
    allowedHeaders: 'Content-Type, Accept, Origin',
    // 'Access-Control-Allow-Origin': '*',
  }
  app.enableCors(options)

  await app.listen(PORT)
  Logger.log(`Application is running on: ${PORT}`)
}
bootstrap()
