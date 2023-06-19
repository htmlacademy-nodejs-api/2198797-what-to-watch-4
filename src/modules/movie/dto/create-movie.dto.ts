import {IsArray, IsEnum, IsInt, Max, MaxLength, MinLength, Min, IsString} from 'class-validator';
import { Genre } from '../../../types/genre.enum.js';

export default class CreateMovieDto {
  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
    name!: string;

  @MinLength(2, {message: 'Minimum description length must be 2'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
    description!: string;

  @IsArray({message: 'Field genre must be an array'})
  @IsEnum(Genre, { each: true })
    genre!: string[];

  @IsInt({message: 'released must be an integer'})
  @Min(1905, {message: 'Minimum released is 1905'})
  @Max(2023, {message: 'Maximum rating is 10'})
    released!: number;

  @IsString({message: 'previewVideoLink is required'})
    previewVideoLink!: string;

  @IsString({message: 'videoLink is required'})
    videoLink!: string;

  @IsArray({message: 'Field starring must be an array'})
    starring!: string[];

  @MaxLength(256, {message: 'Maximum pdirector field is 256'})
    director!: string;

  @IsInt({message: 'runTime must be an integer'})
    runTime!: number;

    @IsString({message: 'backgroundColor is required'})
      backgroundColor!: string;

    userId!: string;
}

