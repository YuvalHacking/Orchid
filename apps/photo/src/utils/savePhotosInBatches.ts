import { Repository } from 'typeorm';
import { Photo } from '@common/entities/photo.entity';

export const savePhotosInBatches = async (
  photoRepository: Repository<Photo>,
  newPhotos: any[],
  batchSize: number,
) => {
  const totalBatches = Math.ceil(newPhotos.length / batchSize);

  for (let i = 0; i < totalBatches; i++) {
    const batch = newPhotos.slice(i * batchSize, (i + 1) * batchSize);
    await photoRepository.save(batch);

    renderProgressBar(i, totalBatches);
  }
};

// Function to render the progress bar
const renderProgressBar = (currentBatch: number, totalBatches: number) => {
  const progress = Math.round(((currentBatch + 1) / totalBatches) * 100);
  const barLength = 50;
  const filledBarLength = Math.round((progress / 100) * barLength);
  const bar =
    '█'.repeat(filledBarLength) + '-'.repeat(barLength - filledBarLength);
  process.stdout.write(`\rLoading photos: [${bar}] ${progress}%`);
};
