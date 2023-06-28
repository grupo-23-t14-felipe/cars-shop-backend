import { AppDataSource } from "../../data-source";
import { Gallery } from "../../entities";
import AppError from "../../errors/appError";

export const deleteGalleryService = async (
  galleryUUID: string
): Promise<void> => {
  const galleryRepo = AppDataSource.getRepository(Gallery);

  const find = await galleryRepo.findOne({
    where: {
      uuid: galleryUUID,
    },
  });

  if (!find) throw new AppError("Image not found", 404);

  await galleryRepo.remove(find);

  return;
};
