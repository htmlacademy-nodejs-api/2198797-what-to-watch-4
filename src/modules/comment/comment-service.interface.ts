import { DocumentType } from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentServiceInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByMovieId(movieId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByMovieId(movieId: string): Promise<number | null>;
}
