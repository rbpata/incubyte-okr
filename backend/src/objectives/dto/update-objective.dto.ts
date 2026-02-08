import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateObjectiveDto {
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title?: string;
}
