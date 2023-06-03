import { inject, injectable } from 'inversify';
import { DocumentType, types} from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { MovieEntity } from '../movie/movie.entity.js';


@injectable()
export default class CommentService implements CommentServiceInterface{
  constructor(
    @inject(AppComponent.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(AppComponent.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>
  ) {}

  private async ratingUpdate(movieId: string){
    const result = await this.commentModel.aggregate([
      {$match: {movieId: movieId}},
      {$group:{result: {$avg: 'rating'}}}
    ]);

    await this.movieModel.updateOne(
      {movieId: movieId},
      {$set: {rating: result}}
    );
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await this.ratingUpdate(String(comment.movieId));
    return comment.populate('userId');
  }

  public async findByMovieId(movieId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({movieId})
      .populate('userId');
  }

  public async deleteByMovieId(movieId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({movieId})
      .exec();
    await this.ratingUpdate(movieId);
    return result.deletedCount;
  }
}
