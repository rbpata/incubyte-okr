import { KeyResultDto } from '../key-result/dto/key-result.dto';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ObjectiveDto {
    id?: string;
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsDefined()
    keyResults: KeyResultDto[];
}
