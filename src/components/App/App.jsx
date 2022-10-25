import { Component } from 'react';
import Notiflix from 'notiflix';
import { SearchBar } from '../SearchBar/SearchBar';
import { LoadMoreBtn } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { ImagesLoadService } from 'components/RequestService/ReguestService';

const imagesLoader = new ImagesLoadService();

export class App extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    userRequest: '',
    totalImages: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { userRequest, page } = this.state;

    if (prevState.userRequest !== userRequest) {
      imagesLoader.resetPage();
      this.imagesRequest();
      this.setState({ images: [] });
    }

    if (page !== prevState.page) {
      this.imagesRequest();
    }
  }

  imagesRequest = async () => {
    try {
      const { userRequest, page } = this.state;

      this.setState({ status: 'pending' });
      imagesLoader.query = userRequest;
      const obtainedImages = await imagesLoader.requestImages();

      if (page === 1) {
        return this.setState({
          images: [...obtainedImages.hits],
          totalImages: obtainedImages.total,
          status: 'resolved',
        });
      }

      if (page >= 2) {
        return this.setState(prev => {
          return {
            images: [...prev.images, ...obtainedImages.hits],
            totalImages: obtainedImages.total,
            status: 'resolved',
          };
        });
      }
    } catch (err) {
      this.setState({ error: err.message, page: 1, status: 'rejected' });
    }
  };

  setUserInputToState = userInput => {
    if (userInput === '') {
      return Notiflix.Notify.warning('Please, enter youre request!', {
        width: '500px',
        fontSize: '20px',
      });
    }
    this.setState({
      userRequest: userInput,
    });
  };

  showNextImages = () => {
    this.setState({ page: imagesLoader.page });
  };

  render() {
    const { images, error, status, totalImages } = this.state;
    const { setUserInputToState, showNextImages } = this;

    return (
      <AppContainer>
        <SearchBar onSubmit={setUserInputToState} />

        {totalImages !== 0 && <ImageGallery images={images} />}

        {status === 'pending' && <Loader />}

        {status === 'resolved' && totalImages > images.length && (
          <LoadMoreBtn onBtnClick={showNextImages} />
        )}

        {status === 'rejected' && <h1>{error}</h1>}
      </AppContainer>
    );
  }
}
