import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetPhotoInput } from '@dtos/photo/get.photo.dto';
import { PhotoActions } from '@common/patterns/photo.pattern';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_CLIENT') private readonly photoClient: ClientProxy,
  ) {}

  // Get a photo based on user input - if no input, return all photos
  getPhoto(userInput: GetPhotoInput) {
    return this.photoClient.send({ cmd: PhotoActions.GET_PHOTO }, userInput);
  }
}
