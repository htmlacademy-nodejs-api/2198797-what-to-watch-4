import { Expose } from 'class-transformer';

export default class UserRdo {
  @Expose()
  public email!: string ;

  @Expose()
  public firstName!: string;

  @Expose()
  public lastName!: string;
}
