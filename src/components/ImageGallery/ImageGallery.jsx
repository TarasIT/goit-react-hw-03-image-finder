import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    showModal: false,
    imageId: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getImageIdByClick = id => {
    this.setState({
      imageId: id,
    });
    this.toggleModal();
  };

  getLargeImgUrlForModal = () => {
    const { imageId } = this.state;
    const { images } = this.props;
    const selectedImgUrl = images.find(({ id }) => id === imageId);
    return selectedImgUrl.largeImageURL;
  };

  render() {
    const { showModal } = this.state;
    const { images, children } = this.props;
    const { getImageIdByClick, toggleModal, getLargeImgUrlForModal } = this;

    return (
      <Gallery>
        <ImageGalleryItem images={images} onSelectImage={getImageIdByClick} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={getLargeImgUrlForModal()} alt="" />
          </Modal>
        )}
        {children}
      </Gallery>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
