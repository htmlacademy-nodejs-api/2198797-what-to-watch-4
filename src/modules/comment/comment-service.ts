import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { MovieEntity } from '../movie/movie.entity.js';
import { DEFAULT_COMMENT_COUNT } from './comment.constants.js';


@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(AppComponent.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(AppComponent.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>
  ) { }

  private async updateRating(movieId: string) {
    const result = await this.commentModel.aggregate([
      { '$match': { 'movieId': new mongoose.Types.ObjectId(movieId) } },
      { '$group': { _id: movieId, result: { '$avg': '$rating' } } }
    ]);

    const roundedResult = (Number(result[0].result)).toFixed(1);
    await this.movieModel.updateOne(
      { _id: movieId },
      { $set: { rating: roundedResult } }
    );
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await this.updateRating(String(comment.movieId));
    return comment.populate('userId');
  }

  public async findByMovieId(movieId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ movieId })
      .limit(DEFAULT_COMMENT_COUNT)
      .populate('userId')
      .exec();
  }

  public async deleteByMovieId(movieId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ movieId })
      .exec();
    await this.updateRating(movieId);
    return result.deletedCount;
  }
}
