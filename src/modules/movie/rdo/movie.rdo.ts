import { Expose, Type } from 'class-transformer';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class MovieRdo {
    @Expose()
  public id!: string;

    @Expose()
    public name!: string;

    @Expose()
    public description!: string;

    @Expose()
    public premiereDate!: Date;

    @Expose()
    public genre!: string[];

    @Expose()
    public released!: number;

    @Expose()
    public rating!: number;

    @Expose()
    public previewVideoLink!: string;

    @Expose()
    public videoLink!: string;

    @Expose()
    public starring!: string[];

    @Expose()
    public director!: string;

    @Expose()
    public runTime!: number;

    @Expose()
    public posterImage!: string;

    @Expose()
    public backgroundImage!: string;

    @Expose()
    public backgroundColor!: string;

    @Expose()
    public commentsCount!: string;

    @Expose({ name: 'userId'})
    @Type(() => UserRdo)
    public user!: UserRdo;
}
