import { Grid } from  'react-loader-spinner'
import styles from './Loader.module.css'


const Loader = () => {
    return ( 
        <Grid
            height="80"
            width="80"
            color="#5366ce"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass={styles.grid}
            visible={true}
        />
     );
}
 
export default Loader;