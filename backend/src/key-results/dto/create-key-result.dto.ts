import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKeyResultDto {
  @ApiProperty({
    description: 'The description of the key result',
    example: 'Achieve 90% customer satisfaction score',
    minLength: 5,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Description must be at least 5 characters long',
  })
  description: string;

  @ApiProperty({
    description: 'The current progress of the key result (0-100)',
    example: 0,
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0, { message: 'Progress cannot be less than 0' })
  @Max(100, { message: 'Progress cannot be more than 100' })
  progress: number;
}
