import { Injectable } from '@nestjs/common'
import { SubscriptionsRepository } from 'src/Subscription/domain/Subscription.repository'
import { PaySubscriptionDto } from './PaySubscription.dto'

@Injectable()
export class PaySubscription {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  async pay(body: PaySubscriptionDto) {

    return await this.subscriptionsRepository.create(body)
  }
}
