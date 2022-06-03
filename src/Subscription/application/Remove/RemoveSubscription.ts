import { Injectable } from '@nestjs/common'
import { SubscriptionsRepository } from 'src/Subscription/domain/Subscription.repository'

@Injectable()
export class RemoveSubscription {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  __invoke(id) {
    return this.subscriptionsRepository.remove(id)
  }
}
