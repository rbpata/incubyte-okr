import {
  IsOptional,
  IsString,
  MinLength,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateKeyResultDto {
  @ApiProperty({
    description: 'The updated description of the key result',
    example: 'Achieve 95% customer satisfaction score',
    minLength: 5,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: 'Description must be at least 5 characters long',
  })
  description?: string;

  @ApiProperty({
    description: 'The updated progress of the key result (0-100)',
    example: 75,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Progress cannot be less than 0' })
  @Max(100, { message: 'Progress cannot be more than 100' })
  progress?: number;
}
