import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchGallery } from 'Services/imagesApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Container } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  
 
  useEffect(() => {
    if (!query) {
      return;
    }

    const getGallery = async () => {
      try {
        setStatus('pending');
        const { hits, totalHits } = await fetchGallery(query, page);

        if (hits.length <= 0) {
          setStatus('rejected');
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (page === 1) {
          toast.success(`We found ${totalHits} images.`);
        }

        setImages(images => [...images, ...hits]);
        
      } catch (error) {
        setStatus('rejected');
        toast.error('Sorry, something went wrong, please try again later');
      } finally {
        setStatus('resolved');
      }
    };
    getGallery();
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <Button text="Load more" onClick={loadMore} />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover={false}
        theme="light"
      />
    </Container>
  );
}
