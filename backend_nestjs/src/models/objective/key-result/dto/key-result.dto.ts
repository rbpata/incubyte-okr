import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class KeyResultDto {
    id?: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsDefined()
    progress: number;

    @IsNotEmpty()
    @IsDefined()
    toDelete: boolean;
}
