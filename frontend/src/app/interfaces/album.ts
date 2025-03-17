import { Artist } from "./artist";
import { Image } from "./image";

export interface Album {
  id: string;
  name: string;
  images: Image[];
  artists: Artist[];
}
