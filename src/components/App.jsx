import React, { useState } from 'react';
import styles from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import { fetchPhoto } from 'API/api';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';


export const App = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  

  const onSubmit = () => {
    if (search) {
      const firstPage = 1;
      setCards([]);
      setPage(firstPage);
      fetchSearch(firstPage);
    }
  };


    


  const handleSubmit = (event) => {
    event.preventDeafault();
        if (search.trim() === '') {
      alert.error('Enter your search query');
      return;
    }
    onSubmit(search);
  };

  const onInputChange = e => {
    setSearch(e.target.value.toLowerCase());
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
        <Searchbar
          onSubmit={handleSubmit}
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

 

