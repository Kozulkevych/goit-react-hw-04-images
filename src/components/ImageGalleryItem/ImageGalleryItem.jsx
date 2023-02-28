import { useState } from 'react';
import PropTypes from 'prop-types';
import { ItemGallery, Image, ImageModal } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({webformatURL, largeImageURL, tags}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ItemGallery>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && 
        <Modal onCloseModal={toggleModal}>
          <ImageModal src={largeImageURL} alt={tags} />
        </Modal>
      }
    </ItemGallery>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
