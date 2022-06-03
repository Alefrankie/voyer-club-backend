import { Injectable } from '@nestjs/common'
import { SubscriptionsRepository } from 'src/Subscription/domain/Subscription.repository'

@Injectable()
export class UpdateSubscription {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  __invoke(id: string, password: string) {
    return this.subscriptionsRepository.update(id, password)
  }
}
