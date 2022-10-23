import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Backdrop, ModalContent } from './Modal.styled';
const ModalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape' || e.currentTarget === e.target) onClose();
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  render() {
    return createPortal(
      <Backdrop onClick={this.closeModal}>
        <ModalContent>{this.props.children}</ModalContent>
      </Backdrop>,
      ModalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
