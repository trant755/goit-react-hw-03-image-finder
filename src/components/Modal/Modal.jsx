import * as SC from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClick();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <SC.Overlay onClick={this.handleBackdropClick}>
        <SC.Modal>
          <img src={src} alt={alt} />
        </SC.Modal>
      </SC.Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
