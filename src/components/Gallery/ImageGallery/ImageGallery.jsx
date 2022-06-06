import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onClick, button }) {
  return (
    <>
      <ul className={s.gallery}>
        {images.map(img => {
          return (
            <ImageGalleryItem
              key={img.id}
              webformatURL={img.webformatURL}
              largeImageURL={img.largeImageURL}
            />
          );
        })}
      </ul>

      {button && <Button onClick={onClick} />}
    </>
  );
}
