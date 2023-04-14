import React, { useState } from 'react';
import Notiflix from "notiflix";

import { fetchPhoto } from 'API/api';

import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';


import styles from './App.module.css';


export const App = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  

  const onSubmit = () => {
    if (search) {
      const firstPage = 1;
      setCards([]);
      setPage(firstPage);
      fetchSearch(firstPage);
    }
  };


  const onInputChange = e => {
    setSearch(e.target.value.toLowerCase());
  };


  const handleSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      Notiflix.Notify.info('You have not entered a query');
      return;
    }
    onSubmit(search);
  };

  
  
  const fetchSearch = async (numPage) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchPhoto(search, numPage);
      const dataArray = [];
      response.map(({ id, webformatURL, largeImageURL }) =>
        dataArray.push({ id, webformatURL, largeImageURL })
      );

      if (dataArray.length === 0) {
        return dataArray;
      }
      setCards(prevState => [...prevState, ...response]
      );
    } catch (error) {
      setError(error);
    } finally {
      setTimeout(() => setIsLoading( false ) , 600);
    }
  }

  const handleButton = () => {
    setPage(page + 1);
      fetchSearch(page + 1);
  }

  const handleShow = (url) => {
    setShowModal(true);
    setLargeImageURL(url);
  }

  const handleClose = () => {
    setShowModal(false);
    setLargeImageURL("");
  }
  
  
    return (
      <div className={styles.App}>
        {error && <p>Something went wrong: {error.message}</p>}
        <Searchbar
          handleSubmit={handleSubmit}
          onInputChange={onInputChange}
          search={search}
        />
        <ImageGallery cards={cards} onShow={handleShow} />
        {isLoading && <Loader />}
        {cards.length > 0 && !isLoading ? (
          <Button onClick={handleButton} />) : ("")}
        {showModal && (
          <Modal onClose={handleClose} image={largeImageURL} />)}
      </div>
    );
  }

 

