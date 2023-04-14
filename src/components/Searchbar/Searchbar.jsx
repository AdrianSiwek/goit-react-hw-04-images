import PropTypes from "prop-types";
import React from 'react';
import styles from './Searchbar.module.css';


const Searchbar = ({handleSubmit, onInputChange, search}) =>  {

    return (
      <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={handleSubmit}>
                    <input
                        onChange={onInputChange}
                        className={styles.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={search}
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


Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
 
export default Searchbar;
 
