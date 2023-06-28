import { Request, Response } from "express";
import { deleteGalleryService } from "../services/gallery/deleteGallery.service";

export const deleteGalleryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteGalleryService(req.params.galleryUUID);
  return res.status(204).send();
};
