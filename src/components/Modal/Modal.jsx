import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalStyled } from './Modal.styled';

export const Modal = ({ children, onCloseModal }) => {
  useEffect(() => {
    const onClose = e => {
      if (e.currentTarget === e.target || e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onClose);
    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [onCloseModal]);

  return (
    <ModalOverlay onClick={onCloseModal}>
      <ModalStyled>{children}</ModalStyled>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node.isRequired,
};
