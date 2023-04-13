import PropTypes from "prop-types";
import React, { Component } from 'react';
import styles from './Searchbar.module.css';
import Notiflix from "notiflix";

class Searchbar extends Component {
  state = { 
    search: '',
  } 


  handleChangeInput = (event) => {
    this.setState({ search: event.target.value.toLowerCase() });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.search.trim() === '') {
      Notiflix.Notify.info('You have not entered a query')
      return;
    }
    this.props.onSubmit(this.state.search)
  }

  
  render() { 
    return (
      <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChangeInput}
                        className={styles.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.search}
                    />
                    <button type="submit" className={styles.SearchFormButton}>&#x1F50D;
                        <span className={styles.SearchFormButtonLabel}>
                            Search
                        </span>
                    </button>
                </form>
            </header>
    );
  }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
 
export default Searchbar;
 
