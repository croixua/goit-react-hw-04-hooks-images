import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import fetchImages from '../../services/fetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import 'react-loading-skeleton/dist/skeleton.css';
import s from './Gallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Gallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [button, setButton] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    setStatus(Status.PENDING);
    setPage(1);
    setButton(true);

    fetchImages(searchQuery, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === totalHits) {
          setButton(false);
        }

        setImages(hits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error.message);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) return;

    fetchImages(searchQuery, page)
      .then(({ hits, totalHits }) => {
        if (images.length + hits.length === totalHits) setButton(false);

        setImages([...images, ...hits]);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error.message);
        setStatus(Status.REJECTED);
      });
  }, [page]);

  const handleLoadMoreClick = () => setPage(page + 1);

  if (status === Status.IDLE) return <p>Enter a search query</p>;

  if (status === Status.PENDING)
    return (
      <Skeleton count={12} containerClassName={s.loader} className={s.card} />
    );

  if (status === Status.RESOLVED)
    return (
      <ImageGallery
        images={images}
        onClick={handleLoadMoreClick}
        button={button}
      />
    );

  if (status === Status.REJECTED) return <p>{error}</p>;
}
