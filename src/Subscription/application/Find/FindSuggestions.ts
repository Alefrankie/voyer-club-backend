import { Injectable } from '@nestjs/common'
import { SubscriptionsRepository } from 'src/Subscription/domain/Subscription.repository'
import { User } from 'src/User/domain/User.entity'

@Injectable()
export class FindSuggestions {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  __invoke(userId): Promise<User[]> {
    return this.subscriptionsRepository.findSuggestions(userId)
  }
}
