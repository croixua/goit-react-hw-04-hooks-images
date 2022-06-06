import { useState } from 'react';
import Modal from '../../../Modal/Modal';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, largeImageURL }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <li className={s.item}>
        <img
          className={s.image}
          src={webformatURL}
          alt=""
          width={300}
          onClick={toggleModal}
        />
      </li>
      {modal && <Modal largeImageURL={largeImageURL} onClose={toggleModal} />}
    </>
  );
}
