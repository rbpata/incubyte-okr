import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { KeyResultsService } from './key-results.service';

@Controller('key-results')
export class KeyResultsController {
  constructor(private readonly keyResultsService: KeyResultsService) {}

  @Get()
  getKeyResults() {
    return this.keyResultsService.getKeyResults();
  }
}
