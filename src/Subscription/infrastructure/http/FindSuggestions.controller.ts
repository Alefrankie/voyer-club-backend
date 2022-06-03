import { Body, Controller, Post } from '@nestjs/common'
import { FindSuggestions } from 'src/Subscription/application/Find/FindSuggestions'
import { User } from 'src/User/domain/User.entity'

@Controller('/find-suggestions')
export class FindSuggestionsController {
  constructor(private findSuggestions: FindSuggestions) {}

  @Post()
  getAll(@Body() body: any): Promise<User[]> {

    return this.findSuggestions.__invoke(body.userId)
  }
}
