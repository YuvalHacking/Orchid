import { IsString, IsNotEmpty } from 'class-validator';

export class AddFavoriteInput {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  photoId: string;
}
