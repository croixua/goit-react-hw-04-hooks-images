import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  render() {
    const { images, onClick, button } = this.props;
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
}
