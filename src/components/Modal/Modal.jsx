import React, { useEffect } from "react";
import styles from './Modal.module.css';
import PropTypes from "prop-types";


const Modal = ({onClose, image}) => {

  useEffect(() => {
    const handleModalKeyDown = (event) => {
        if (event.code === "Escape") {
            return onClose();
        }
  };
    window.addEventListener("keydown", handleModalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleModalKeyDown);
    };
  }, [onClose]);

  
  
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }


Modal.propTypes = {
    onClose: PropTypes.func,
    image: PropTypes.string.isRequired,
};
 
export default Modal;