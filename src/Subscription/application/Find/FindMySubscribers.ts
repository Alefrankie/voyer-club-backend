import { Injectable } from '@nestjs/common'
import { SubscriptionsRepository } from 'src/Subscription/domain/Subscription.repository'

@Injectable()
export class FindMySubscribers {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  __invoke() {
    return this.subscriptionsRepository.findAll()
  }
}
