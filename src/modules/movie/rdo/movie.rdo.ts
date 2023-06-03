import { Expose } from 'class-transformer';

export default class MovieRdo {
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
}
