import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { Photo } from '@common/entities/photo.entity';

export const getExistingPhotoIds = async (photoRepository: Repository<Photo>, photos: any[]) => {
  const existingPhotos = await photoRepository.find({
    select: ['id'],
    where: { id: In(photos.map(photo => photo.id)) }
  });
  return new Set(existingPhotos.map(photo => photo.id));
};
