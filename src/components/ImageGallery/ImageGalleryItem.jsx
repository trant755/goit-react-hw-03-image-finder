import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import * as SC from './ImageGallery.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    modalOpen: false,
  };

  OnImgClick = () =>
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));

  render() {
    const { src, alt, largeSrc } = this.props;
    return (
      <SC.ImageGalleryItem>
        <SC.ImageGalleryImage onClick={this.OnImgClick} src={src} alt={alt} />
        {this.state.modalOpen && (
          <Modal src={largeSrc} alt={alt} onClick={this.OnImgClick} />
        )}
      </SC.ImageGalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeSrc: PropTypes.string.isRequired,
};
