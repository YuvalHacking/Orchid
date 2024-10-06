import { IsInt, Min, Max } from 'class-validator';

export class GetTopFavoritesInput {
  @IsInt()
  @Min(1)
  @Max(10)
  limit: number;
}
