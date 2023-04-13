import PropTypes from "prop-types";
import styles from './ImageGallery.module.css';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({cards, onShow}) => {
    return ( 
        <ul className={styles.ImageGallery}>
                {cards.map(({ webformatURL, largeImageURL, id, tags }) => (
                    <ImageGalleryItem
                        key={id}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        onShow={onShow}
                        tags={tags}
                    />
                ))}
            </ul>
     );
}
 

ImageGallery.propTypes = {
    onShow: PropTypes.func.isRequired,
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ),
};

export default ImageGallery;