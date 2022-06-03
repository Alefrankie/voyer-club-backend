import { Module } from '@nestjs/common'
import { UsersModule } from './User/users.module'
import { PostsModule } from './Post/post.module'
// import { ChatModule } from './Chat/chat.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionsModule } from './Subscription/subscription.module'
import { SharedModule } from './Shared/Shared.module'
import { ChatModule } from './Chat/chat.module'
import { StreamingModule } from './Streaming/streaming.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'voyer_club',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    UsersModule,
    PostsModule,
    SubscriptionsModule,
    SharedModule,
    ChatModule,
    StreamingModule
    // ChatModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
