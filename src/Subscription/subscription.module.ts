import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/User/domain/User.entity'
import { FindMySubscribers, FindOneById } from './application/Find'
import { FindSuggestions } from './application/Find/FindSuggestions'
import { LinkPaypal } from './application/LinkPaypal/LinkPaypal'
import { PaySubscription } from './application/PaySubscription/PaySubscription'
import { Remove } from './application/Remove'
import { Subscription } from './domain/Subscription.entity'
import { SubscriptionsRepository } from './domain/Subscription.repository'
import { Transaction } from './domain/Transaction.entity'
import { FindMySubscribersController } from './infrastructure/http/FindMySubscribers.controller'
import { FindSuggestionsController } from './infrastructure/http/FindSuggestions.controller'
import { LinkPaypalController } from './infrastructure/http/LinkPaypal.controller'
import { PaySubscriptionController } from './infrastructure/http/PaySubscription.controller'
import { RemoveController } from './infrastructure/http/Remove.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, Transaction, User]),
    HttpModule
  ],
  providers: [
    SubscriptionsRepository,
    FindOneById,
    FindMySubscribers,
    PaySubscription,
    Remove,
    LinkPaypal,
    FindSuggestions
  ],
  controllers: [
    FindMySubscribersController,
    RemoveController,
    PaySubscriptionController,
    LinkPaypalController,
    FindSuggestionsController
  ]
})
export class SubscriptionsModule {}
