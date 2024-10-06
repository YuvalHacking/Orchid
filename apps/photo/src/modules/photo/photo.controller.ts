import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetPhotoInput } from '@dtos/photo/get.photo.dto';
import { PhotoService } from './photo.service';
import { PhotoActions } from '@common/patterns/photo.pattern';

@Controller()
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  // Get a photo based on title - if no input, return all photos
  @MessagePattern({ cmd: PhotoActions.GET_PHOTO })
  handleGetPhotos(@Payload() userInput: GetPhotoInput) {
    if (userInput.title) {
      return this.photoService.findPhotoByTitle(userInput.title);
    } else {
      return this.photoService.findAllPhotos();
    }
  }
}
