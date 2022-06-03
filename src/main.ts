import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'


const PORT = process.env.PORT || 3001

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule)
  const options = {
    credentials: false,
    methods: ['GET', 'POST', 'PUT', '*'],
    origin: '*',
    allowedHeaders: 'Content-Type, Authorization'
  }
  app.enableCors(options)
  await app.listen(PORT)
}

bootstrap()
