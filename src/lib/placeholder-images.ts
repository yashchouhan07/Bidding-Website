import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

type PlaceholderImages = {
    [key: string]: ImagePlaceholder;
}

const images = data.placeholderImages.reduce((acc: PlaceholderImages, current: ImagePlaceholder) => {
    acc[current.id] = current;
    return acc;
}, {});


export const placeholderImages = images;
