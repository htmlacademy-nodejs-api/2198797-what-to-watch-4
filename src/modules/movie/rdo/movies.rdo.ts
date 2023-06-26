import { Expose, Type } from 'class-transformer';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class MoviesRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public premiereDate!: Date;

  @Expose()
  public genre!: string;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public posterImage!: string;

  @Expose()
  public commentsCount!: string;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user!: UserRdo;
}
