import { defaultClasses, getModelForClass, Ref, prop, modelOptions } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';


export interface MovieEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'movies'
  }
})

export class MovieEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name!: string;

  @prop({ trim: true })
  public description!: string;

  @prop({ required: true, default: Date.now })
  public premiereDate!: Date;

  @prop({ required: true, type: () => String })
  public genre!: string[];

  @prop({ required: true })
  public released!: number;

  @prop({ default: 0 })
  public rating!: number;

  @prop({ trim: true })
  public previewVideoLink!: string;

  @prop({ trim: true })
  public videoLink!: string;

  @prop({ required: true, type: () => String })
  public starring!: string[];

  @prop({ trim: true, required: true })
  public director!: string;

  @prop({ required: true })
  public runTime!: number;

  @prop({ default: '' })
  public posterImage!: string;

  @prop({ default: '' })
  public backgroundImage!: string;

  @prop({ trim: true, required: true })
  public backgroundColor!: string;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({
    ref: UserEntity,
    default: []
  })
  public favorite?: Ref<UserEntity>[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

}

export const MovieModel = getModelForClass(MovieEntity);
