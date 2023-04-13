import React, { Component } from "react";
import styles from './Modal.module.css';
import PropTypes from "prop-types";


class Modal extends Component {

  componentDidMount() {
    window.addEventListener("keydown", this.handleModalKeyDown);
  }
  
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleModalKeyDown);
  }

  handleModalKeyDown = (event) => {
        if (event.code === "Escape") {
            return this.props.onClose();
        }
  };
  
  

  
  render() { 
    const {image} = this.props
    return (
      <div className={styles.overlay} onClick={this.props.onClose}>
        <div className={styles.modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
    onClose: PropTypes.func,
    image: PropTypes.string.isRequired,
};
 
export default Modal;