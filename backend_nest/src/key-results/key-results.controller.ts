import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { KeyResultsService, type KeyResult } from './key-results.service';
import { KeyResultDto } from './dto/key-result.dto';

@Controller('key-results')
class KeyResultsController {
  constructor(private readonly keyResultsService: KeyResultsService) {}

  @Get()
  getKeyResults() {
    return this.keyResultsService.getAll();
  }
  @Post()
  create(@Body() createKeyResultDto: KeyResultDto): KeyResult {
    return this.keyResultsService.create(createKeyResultDto);
  }
}

export default KeyResultsController;
