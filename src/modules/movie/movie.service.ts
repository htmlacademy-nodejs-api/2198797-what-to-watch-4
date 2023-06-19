import { inject, injectable } from 'inversify';
import CreateMovieDto from './dto/create-movie.dto';
import { DocumentType, types } from '@typegoose/typegoose';
import { MovieEntity } from './movie.entity';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface';
import { MovieServiceInterface } from './movie-service.interface';
import {DEFAULT_MOVIE_COUNT} from './movie.constants.js';
import UpdateMovieDto from './dto/update-movie.dto.js';
import { DEFAULT_POSTER_IMGE_FILE_NAME } from './movie.constant.js';
import { DEFAULT_BACKGROUND_IMAGE_FILE_NAME } from './movie.constant.js';

@injectable()
export default class MovieService implements MovieServiceInterface{
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>
  ){}

  public async create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>>{
    const result = await this.movieModel.create({...dto, posterImage:DEFAULT_POSTER_IMGE_FILE_NAME, backgroundImage:DEFAULT_BACKGROUND_IMAGE_FILE_NAME});
    this.logger.info(`New movie created: ${dto.name}`);

    return result;
  }

  public async findById(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findById(movieId)
      .populate('userId')
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<MovieEntity>[]> {
    const limit = count ?? DEFAULT_MOVIE_COUNT;

    return this.movieModel
      .find()
      .populate('userId')
      .limit(limit)
      .exec();
  }

  public async findByGenre(genre: string, count?: number): Promise<DocumentType<MovieEntity>[] | null>{
    const limit = count ?? DEFAULT_MOVIE_COUNT;

    return this.movieModel
      .find({ genre : { $all : [genre] }}, {}, {limit})
      .populate('userId')
      .limit(limit)
      .exec();
  }

  public async deleteById(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndDelete(movieId)
      .exec();
  }

  public async updateById(movieId: string, dto: UpdateMovieDto): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndUpdate(movieId, dto, {new: true})
      .populate('userId')
      .exec();
  }

  public async incCommentCount(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndUpdate(movieId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async exists(movieId: string): Promise<boolean> {
    return (await this.movieModel
      .exists({_id: movieId})) !== null;
  }

  public async matchMovieUser(movieId: string, userId:string): Promise<boolean> {
    return (await this.movieModel
      .exists({_id: movieId, userId:userId})) !== null;
  }

  public async getFavouriteMovies(userId:string): Promise<DocumentType<MovieEntity>[] | null>{
    return this.movieModel
      .find({favorite: userId})
      .populate('userId')
      .exec();
  }

  public async updateFavoriteMovies(userId:string, movieId:string, status:string): Promise<DocumentType<MovieEntity> | null>{
    if(Number(status) !== 0){
      return this.movieModel
        .findByIdAndUpdate(movieId, {'$addToSet': {
          favorite: userId,
        }})
        .populate('userId')
        .exec();
    }
    return this.movieModel
      .findByIdAndUpdate(movieId, {'$pull': {favorite: userId}})
      .exec();

  }
}
