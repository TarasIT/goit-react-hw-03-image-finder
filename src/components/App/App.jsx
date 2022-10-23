import { Component } from 'react';
import Notiflix from 'notiflix';
import { SearchBar } from '../SearchBar/SearchBar';
import { ImagesLoadService } from '../RequestService/ReguestService';
import { LoadMoreBtn } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import { Loader } from 'components/Loader/Loader';

const imagesLoader = new ImagesLoadService();

export class App extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
  };

  firstImagesRequest = async userRequest => {
    try {
      if (userRequest === '') {
        return Notiflix.Notify.warning(
          'Please, enter youre request in the search form!',
          {
            width: '500px',
            fontSize: '20px',
          }
        );
      }

      this.setState({ images: [], status: 'pending' });
      imagesLoader.query = userRequest;
      imagesLoader.resetPage();
      const obtainedImages = await imagesLoader.requestImages();
      this.setState({
        images: [...obtainedImages],
        status: 'resolved',
      });
    } catch (err) {
      this.setState({ error: err.message, status: 'rejected' });
    }
  };

  nextImagesRequest = async () => {
    try {
      this.setState({ status: 'pending' });
      const obtainedImages = await imagesLoader.requestImages();
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...obtainedImages],
          status: 'resolved',
        };
      });
    } catch (err) {
      this.setState({ error: err.message, status: 'rejected' });
    }
  };

  render() {
    const { images, error, status } = this.state;
    const { firstImagesRequest, nextImagesRequest } = this;

    return (
      <AppContainer>
        <SearchBar onSubmit={firstImagesRequest} />

        {images.length !== 0 && <ImageGallery images={images} />}

        {status === 'pending' && <Loader />}

        {status === 'resolved' &&
          images.length % imagesLoader.imagesAmount === 0 && (
            <LoadMoreBtn onBtnClick={nextImagesRequest} />
          )}

        {status === 'rejected' && <h1>{error}</h1>}
      </AppContainer>
    );
  }
}
