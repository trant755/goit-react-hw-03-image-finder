import React, { Component } from 'react';
import { Box } from './Box';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from '../helpers/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    foundPictures: [],
    error: false,
    isLoad: false,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      try {
        const newImgs = await API.imageFetch(
          this.state.searchQuery,
          this.state.page
        );
        this.setState(prevState => ({
          foundPictures: [...prevState.foundPictures, ...newImgs],
          isLoad: false,
        }));
      } catch (error) {
        this.setState({ error: true, isLoading: false });
        console.log(error);
      }
    }
  }

  SubmitImgForm = ({ search }, { resetForm }) => {
    this.setState(prevState => {
      if (prevState.searchQuery !== search) {
        return {
          searchQuery: search,
          page: 1,
          foundPictures: [],
          isLoad: true,
        };
      }
    });
  };

  HandleLoadMore = () =>
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoad: true,
    }));

  render() {
    const pictures = this.state.foundPictures;
    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Searchbar onSubmit={this.SubmitImgForm} />
        <ImageGallery images={pictures} />
        {this.state.isLoad && <Loader />}
        {pictures.length > 0 && (
          <Button text={'Load more'} onClick={this.HandleLoadMore} />
        )}
      </Box>
    );
  }
}
