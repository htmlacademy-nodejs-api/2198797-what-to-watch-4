import { Expose} from 'class-transformer';

export default class CreateMovieRdo {
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

}
