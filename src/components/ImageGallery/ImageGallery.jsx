import { ImageGalleryItem } from './ImageGalleryItem';
import * as SC from './ImageGallery.styled';

export const ImageGallery = ({ images }) => (
  <SC.ImageGallery>
    {images.map(img => (
      <ImageGalleryItem
        key={img.id}
        src={img.webformatURL}
        largeSrc={img.largeImageURL}
        alt={img.tags}
      />
    ))}
  </SC.ImageGallery>
);
