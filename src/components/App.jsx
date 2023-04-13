import React, { Component } from 'react';
import styles from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import { fetchPhoto } from 'API/api';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';


export class App extends Component {
  state = { 
    search: "",
    page: 1,
    cards: [],
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: "",
    webformatURL: "",
  } 

  handleSubmit = (search) => {
        if (search !== this.state.search) {
            this.setState({ images: [], page: 1, search }, () => {
                this.fetchSearch(search);
            });
        }
  };
  
  fetchSearch = async (valueSearch) => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetchPhoto(valueSearch, this.state.page);
      this.setState((prevState) => ({
        cards: [...prevState.cards, ...response]
      }));
    } catch (error) {
      this.setState({ error: error });
    } finally {
      setTimeout(() => this.setState({ isLoading: false }) , 600);
    }
  }

  handleButton = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchSearch(this.state.search);
    });
  }

  handleShow = (url) => {
    this.setState({ showModal: true, largeImageURL: url });
  }

  handleClose = () => {
    this.setState({ showModal: false, largeImageURL: "" });
  }
  
  render() { 
    const { cards, isLoading, largeImageURL, showModal } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery cards={cards} onShow={this.handleShow} />
        {isLoading && <Loader />}
        {cards.length > 0 && !isLoading ? (
          <Button onClick={this.handleButton} />) : ("")}
        {showModal && (
          <Modal onClose={this.handleClose} image={largeImageURL} />)}
      </div>
    );
  }
}
 

