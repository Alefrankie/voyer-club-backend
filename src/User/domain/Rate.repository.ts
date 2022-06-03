import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Rate } from './Rate.entity'

@Injectable()
export class RatesRepository {
  constructor(
    @InjectRepository(Rate)
    private ratesRepository: Repository<Rate>
  ) {}

  async updateRate(body: any) {
    const dataFound = await this.ratesRepository.findOne({
      where: { user: body.user }
    })

    if (!dataFound) {
      const newData: any = this.ratesRepository.create(body)

      await this.ratesRepository.save(newData)
      return await this.ratesRepository.findOne(newData.id)
    }

    this.ratesRepository.merge(dataFound, body)
    return this.ratesRepository.save(dataFound)
  }
}
