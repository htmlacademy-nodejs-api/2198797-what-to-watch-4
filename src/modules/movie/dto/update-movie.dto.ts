import {IsArray, IsDateString, IsEnum, IsInt, IsOptional, Max, MaxLength, MinLength, Min, IsString} from 'class-validator';
import { Genre } from '../../../types/genre.enum.js';

export default class UpdateMovieDto {
  @IsOptional()
  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
    name?: string;

  @IsOptional()
  @MinLength(2, {message: 'Minimum description length must be 2'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
    description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
    premiereDate?: Date;

  @IsOptional()
  @IsArray({message: 'Field genre must be an array'})
  @IsEnum(Genre, { each: true })
    genre?: string[];

  @IsOptional()
  @IsInt({message: 'released must be an integer'})
  @Min(1905, {message: 'Minimum released is 1905'})
  @Max(2023, {message: 'Maximum rating is 10'})
    released?: number;

  @IsOptional()
  @IsString({message: 'previewVideoLink is required'})
    previewVideoLink?: string;

  @IsOptional()
  @IsString({message: 'videoLink is required'})
    videoLink?: string;

  @IsOptional()
  @IsArray({message: 'Field starring must be an array'})
    starring?: string[];

  @IsOptional()
  @MaxLength(256, {message: 'Maximum pdirector field is 256'})
    director?: string;

  @IsOptional()
  @IsInt({message: 'runTime must be an integer'})
    runTime?: number;

  @IsOptional()
  @IsString({message: 'posterImage is required'})
  @MaxLength(256, {message: 'Maximum posterImage field is 256'})
    posterImage?: string;

  @IsOptional()
  @IsString({message: 'backgroundImage is required'})
  @MaxLength(256, {message: 'Maximum backgroundImage field is 256'})
    backgroundImage?: string;

  @IsOptional()
    backgroundColor?: string;
}
