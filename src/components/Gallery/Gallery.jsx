import { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import fetchImages from 'components/services/fetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import 'react-loading-skeleton/dist/skeleton.css';
import s from './Gallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class Gallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: Status.IDLE,
    button: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const value = this.props.searchQuery;
    const { page, images } = this.state;

    if (prevProps.searchQuery !== value) {
      this.setState({
        images: [],
        status: Status.PENDING,
        button: true,
        page: 1,
      });

      fetchImages(value, page)
        .then(data => {
          if (data.hits.length <= data.totalHits)
            this.setState({ button: false });

          this.setState({ images: data.hits, status: Status.RESOLVED });
        })
        .catch(error => {
          this.setState({ error: error.message, status: Status.REJECTED });
        });
    }

    if (prevState.page !== page) {
      this.setState({
        status: Status.PENDING,
      });

      fetchImages(value, page)
        .then(data => {
          if (images.length + data.hits.length === data.totalHits)
            this.setState({ button: false });

          this.setState({
            images: [...images, ...data.hits],
            status: Status.RESOLVED,
          });
        })
        .catch(error => {
          this.setState({ error: error.message, status: Status.REJECTED });
        });
    }
  }

  handleLoadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { images, status, error, button } = this.state;

    if (status === 'idle') return <p>Веди поисковый запрос</p>;

    if (status === 'pending')
      return (
        <Skeleton count={12} containerClassName={s.loader} className={s.card} />
      );

    if (status === 'resolved')
      return (
        <ImageGallery
          images={images}
          onClick={this.handleLoadMoreClick}
          button={button}
        />
      );

    if (status === 'rejected') return <p>{error}</p>;
  }
}
