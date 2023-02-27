import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalStyled } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }

  onClose = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <ModalOverlay onClick={this.onClose}>
        <ModalStyled>{children}</ModalStyled>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
