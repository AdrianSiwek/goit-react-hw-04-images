import PropTypes from "prop-types";
import styles from './Button.module.css';

const Button = ({onClick}) => {
    return ( 
        <button type="button" onClick={onClick} className={styles.Button}>
            Load more
        </button>
     );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}

 
export default Button;