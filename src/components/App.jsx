// import {IconButton} from "./IconButton/IconButton";
// import { MdImageSearch } from 'react-icons/fa';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getImages } from 'Servises/imagesApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Container } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: '',
    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.fetchImages(page);
    }
  }

  async fetchImages() {
    try {
      this.setState({
        status: 'pending',
      });

      const { query, page } = this.state;
      const { hits, totalHits } = await getImages(query, page);

      if (hits.length <= 0) {
        this.setState({
          status: 'rejected',
        });
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (page === 1) {
        this.setState({
          status: 'pending',
        });
        toast.success(`We found ${totalHits} images.`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch (error) {
      this.setState({
        status: 'rejected',
      });
      toast.error('Sorry, something went wrong, please try again later');
    } finally {
      this.setState({
        status: 'resolved',
      });
    }
  }

  handleFormSubmit = query => {
    if (query === this.state.query) {
      return toast.info('There are your last search results');
    }
    this.setState({ query, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <Button text="Load more" onClick={this.loadMore} />
        )}
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
}
