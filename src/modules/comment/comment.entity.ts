import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { MovieEntity } from '../movie/movie.entity';
import { UserEntity } from '../user/user.entity';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}


@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps{
  @prop({trim: true, required: true})
  public comment!: string;

  @prop({trim: true, required: true})
  public rating!: number;

    @prop({
      ref: MovieEntity,
      required: true
    })
  public movieId!: Ref<MovieEntity>;

    @prop({
      ref: UserEntity,
      required: true,
    })
    public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
