import { Controller, Get } from '@nestjs/common';
import { ObjectiveService } from './objective.service';

@Controller('objectives')
export class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}
  @Get()
  getObjectives() {
    return this.objectiveService.getObjectives();
  }

}
