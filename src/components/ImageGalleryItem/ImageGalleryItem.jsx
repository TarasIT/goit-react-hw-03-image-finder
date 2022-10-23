import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  selectImage = e => {
    this.props.onSelectImage(Number(e.currentTarget.id));
  };

  render() {
    const { images } = this.props;

    return images.map(({ id, webformatURL, tags }) => {
      return (
        <GalleryItem key={id} id={id} onClick={this.selectImage}>
          <Image src={webformatURL} alt={tags} />
        </GalleryItem>
      );
    });
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onSelectImage: PropTypes.func.isRequired,
};
