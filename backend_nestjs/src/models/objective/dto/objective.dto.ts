import { KeyResultDto } from '../key-result/dto/key-result.dto';

export class ObjectiveDto {
    id?: string;
    title: string;
    keyResults: KeyResultDto[];
}
