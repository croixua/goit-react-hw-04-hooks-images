import { Component } from 'react';
import Modal from '../../../Modal/Modal';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    modal: false,
  };

  toggleModal = () => {
    this.setState(({ modal }) => ({
      modal: !modal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    const { modal } = this.state;

    return (
      <>
        <li className={s.item}>
          <img
            className={s.image}
            src={webformatURL}
            alt=""
            width={300}
            onClick={this.toggleModal}
          />
        </li>
        {modal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
