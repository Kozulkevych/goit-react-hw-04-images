import { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemGallery, Image, ImageModal } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;
    return (
      <ItemGallery>
        <Image src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ImageModal src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </ItemGallery>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
