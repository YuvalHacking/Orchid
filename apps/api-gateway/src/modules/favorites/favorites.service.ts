import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetFavoritesInput } from '@dtos/favorites/get.favorite.dto';
import { AddFavoriteInput } from '@dtos/favorites/add.favorite.dto';
import { DeleteFavoriteInput } from '@dtos/favorites/delete.favorite.dto';
import { GetTopFavoritesInput } from '@dtos/favorites/get-top.favorite.dto';
import { FavoritePhotoActions } from '@common/patterns/favorites.pattern';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FAVORITES_CLIENT') private readonly photoClient: ClientProxy,
  ) {}

  // Send a message to get all favorite photos for a user
  getFavoritePhotos(userInput: GetFavoritesInput) {
    return this.photoClient.send(
      { cmd: FavoritePhotoActions.GET_FAVORITE_PHOTOS },
      userInput,
    );
  }

  // Send a message to add a photo to the user's favorites
  addFavoritePhoto(userInput: AddFavoriteInput) {
    return this.photoClient.send(
      { cmd: FavoritePhotoActions.ADD_FAVORITE_PHOTO },
      userInput,
    );
  }

  // Send a message to remove a photo from the user's favorites
  removeFavoritePhoto(userInput: DeleteFavoriteInput) {
    return this.photoClient.send(
      { cmd: FavoritePhotoActions.REMOVE_FAVORITE_PHOTO },
      userInput,
    );
  }

  // Send a message to get all top favorite photos
  getTopFavoritedPhotos(userInput: GetTopFavoritesInput) {
    return this.photoClient.send(
      { cmd: FavoritePhotoActions.FIND_TOP_FAVORITED_PHOTOS },
      userInput,
    );
  }
}
