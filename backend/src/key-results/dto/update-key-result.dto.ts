import {
  IsOptional,
  IsString,
  MinLength,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UpdateKeyResultDto {
  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: 'Description must be at least 5 characters long',
  })
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Progress cannot be less than 0' })
  @Max(100, { message: 'Progress cannot be more than 100' })
  progress?: number;
}
