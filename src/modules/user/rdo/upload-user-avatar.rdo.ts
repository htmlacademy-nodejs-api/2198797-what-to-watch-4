import { Expose } from 'class-transformer';

export default class UploadUserAvatarRdo {
  @Expose()
  public avatarPath!: string;
}
