import React, { Component } from 'react';
import { Box } from './Box';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from '../helpers/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    foundPictures: [],
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      const newImgs = await API.imageFetch(
        this.state.searchQuery,
        this.state.page
      );
      this.setState(prevState => ({
        foundPictures: [...prevState.foundPictures, ...newImgs],
      }));
    }
  }

  SubmitImgForm = ({ search }, { resetForm }) => {
    this.setState(prevState => {
      if (prevState.searchQuery !== search) {
        return {
          searchQuery: search,
          page: 1,
          foundPictures: [],
        };
      }
    });
  };

  HandleLoadMore = () =>
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

  render() {
    const pictures = this.state.foundPictures;
    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Searchbar onSubmit={this.SubmitImgForm} />
        <ImageGallery images={pictures} />
        {pictures.length > 0 && (
          <Button text={'Load more'} onClick={this.HandleLoadMore} />
        )}
      </Box>
    );
  }
}
