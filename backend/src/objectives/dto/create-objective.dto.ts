import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateObjectiveDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string;
}
