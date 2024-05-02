import { Controller, Get } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  async getHello(): Promise<string | void> {
    return this.voteService.vote();
  }
}
