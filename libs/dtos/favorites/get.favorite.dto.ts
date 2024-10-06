import { IsString, IsNotEmpty } from 'class-validator';

export class GetFavoritesInput {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
