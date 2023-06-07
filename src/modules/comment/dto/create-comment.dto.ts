import {IsMongoId, IsString, Length, IsNumber, Min, Max} from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public comment!: string;

  @IsNumber()
  @Min(1, {message: 'rating min value is 1'})
  @Max(10, {message: 'rating max value is 10'})
  public rating!: number;

  @IsMongoId({message: 'movieId field must be a valid id'})
  public movieId!: string;

  @IsMongoId({message: 'userId field must be a valid id'})
  public userId!: string;
}
