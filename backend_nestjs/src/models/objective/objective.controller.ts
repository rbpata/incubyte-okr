import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Put,
} from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ObjectiveDto } from './dto/objective.dto';

@Controller('v2/objective')
export class ObjectiveController {
    constructor(private objectiveService: ObjectiveService) {}

    @Get()
    getAll() {
        return this.objectiveService.getAll();
    }
    @Get(':id')
    getOneById(@Param('id') id: string) {
        return this.objectiveService.getOneById(id);
    }
    @Get('/health')
    health() {
        return 'ok';
    }
    @Get()
    getAllByTitle(@Query('title') title: string) {
        return this.objectiveService.getAllByTitle(title);
    }
    @Post()
    create(@Body() createObjectiveDto: Omit<ObjectiveDto, 'id'>) {
        return this.objectiveService.create(createObjectiveDto);
    }

    @Put('/')
    update(@Body() updateObjectiveDto: ObjectiveDto) {
        return this.objectiveService.update(updateObjectiveDto);
    }
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.objectiveService.delete(id);
    }
}
