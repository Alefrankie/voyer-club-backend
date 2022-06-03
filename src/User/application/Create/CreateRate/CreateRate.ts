import { Injectable } from '@nestjs/common'
import { Rate } from 'src/User/domain/Rate.entity'
import { RatesRepository } from 'src/User/domain/Rate.repository'

@Injectable()
export class CreateRate {
  constructor(private ratesRepository: RatesRepository) {}

  __invoke(createRate: any): Promise<Rate> {
    return this.ratesRepository.updateRate(createRate)
  }
}
