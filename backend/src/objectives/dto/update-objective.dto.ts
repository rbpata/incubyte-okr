import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateObjectiveDto {
  @ApiProperty({
    description: 'The updated title of the objective',
    example: 'Increase customer satisfaction by 30%',
    minLength: 5,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title?: string;
}
