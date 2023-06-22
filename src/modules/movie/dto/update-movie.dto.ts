import { IsArray, IsDateString, IsEnum, IsInt, IsOptional, Max, MaxLength, MinLength, Min, IsString } from 'class-validator';
import { Genre } from '../../../types/genre.enum.js';

export default class UpdateMovieDto {
  @IsOptional()
  @MinLength(2, { message: 'Minimum title length must be 2' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public name?: string;

  @IsOptional()
  @MinLength(2, { message: 'Minimum description length must be 2' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public premiereDate?: Date;

  @IsOptional()
  @IsArray({ message: 'Field genre must be an array' })
  @IsEnum(Genre, { each: true })
  public genre?: string[];

  @IsOptional()
  @IsInt({ message: 'released must be an integer' })
  @Min(1905, { message: 'Minimum released is 1905' })
  @Max(2023, { message: 'Maximum rating is 10' })
  public released?: number;

  @IsOptional()
  @IsString({ message: 'previewVideoLink is required' })
  public previewVideoLink?: string;

  @IsOptional()
  @IsString({ message: 'videoLink is required' })
  public videoLink?: string;

  @IsOptional()
  @IsArray({ message: 'Field starring must be an array' })
  public starring?: string[];

  @IsOptional()
  @MaxLength(256, { message: 'Maximum pdirector field is 256' })
  public director?: string;

  @IsOptional()
  @IsInt({ message: 'runTime must be an integer' })
  public runTime?: number;

  @IsOptional()
  @IsString({ message: 'posterImage is required' })
  @MaxLength(256, { message: 'Maximum posterImage field is 256' })
  public posterImage?: string;

  @IsOptional()
  @IsString({ message: 'backgroundImage is required' })
  @MaxLength(256, { message: 'Maximum backgroundImage field is 256' })
  public backgroundImage?: string;

  @IsOptional()
  public backgroundColor?: string;
}
