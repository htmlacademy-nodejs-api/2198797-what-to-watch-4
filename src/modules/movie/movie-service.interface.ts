import {DocumentType} from '@typegoose/typegoose';
import { MovieEntity } from './movie.entity.js';
import CreateMovieDto from './dto/create-movie.dto.js';
import UpdateMovieDto from './dto/update-movie.dto.js';


export interface MovieServiceInterface {
  create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>>;
  find(count?: number): Promise<DocumentType<MovieEntity>[]>;
  findByGenre(genre: string, count?: number): Promise<DocumentType<MovieEntity>[] | null>;
  findById(movieId: string): Promise<DocumentType<MovieEntity> | null>;
  updateById(movieId: string, dto: UpdateMovieDto): Promise<DocumentType<MovieEntity> | null>;
  deleteById(movieId: string): Promise<DocumentType<MovieEntity> | null>;
  incCommentCount(movieId: string): Promise<DocumentType<MovieEntity> | null>;
  exists(movieId: string): Promise<boolean>;
}
