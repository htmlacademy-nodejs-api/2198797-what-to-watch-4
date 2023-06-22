import { IsArray, IsEnum, IsInt, Max, MaxLength, MinLength, Min, IsString } from 'class-validator';
import { Genre } from '../../../types/genre.enum.js';

export default class CreateMovieDto {
  @MinLength(2, { message: 'Minimum title length must be 2' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public name!: string;

  @MinLength(2, { message: 'Minimum description length must be 2' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description!: string;

  @IsArray({ message: 'Field genre must be an array' })
  @IsEnum(Genre, { each: true })
  public genre!: string[];

  @IsInt({ message: 'released must be an integer' })
  @Min(1905, { message: 'Minimum released is 1905' })
  @Max(2023, { message: 'Maximum rating is 10' })
  public released!: number;

  @IsString({ message: 'previewVideoLink is required' })
  public previewVideoLink!: string;

  @IsString({ message: 'videoLink is required' })
  public videoLink!: string;

  @IsArray({ message: 'Field starring must be an array' })
  public starring!: string[];

  @MaxLength(256, { message: 'Maximum pdirector field is 256' })
  public director!: string;

  @IsInt({ message: 'runTime must be an integer' })
  public runTime!: number;

  @IsString({ message: 'backgroundColor is required' })
  public backgroundColor!: string;

  public userId!: string;
}

