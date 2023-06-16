import z from "zod";
import { gallerySchema } from "../schemas/gallery.schemas";

export type TGallery = z.infer<typeof gallerySchema>;
