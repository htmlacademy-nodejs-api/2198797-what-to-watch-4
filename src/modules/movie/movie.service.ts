import { inject, injectable } from 'inversify';
import CreateMovieDto from './dto/create-movie.dto';
import { DocumentType, types } from '@typegoose/typegoose';
import { MovieEntity } from './movie.entity';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface';
import { MovieServiceInterface } from './movie-service.interface';

@injectable()
export default class MovieService implements MovieServiceInterface{
  constructor(
        @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
        @inject(AppComponent.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>
  ){}

  public async create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>>{
    const result = await this.movieModel.create(dto);
    this.logger.info(`New movie created: ${dto.name}`);

    return result;
  }

  public async findById(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel.findById(movieId).exec();
  }
}
