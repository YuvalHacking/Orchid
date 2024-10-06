import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteFavoriteInput {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  photoId: string;
}
