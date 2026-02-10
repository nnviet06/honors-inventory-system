import styles from './LocationsView.module.css';
import LocationTable from '../components/layout/LocationTable';
//import { useState } from 'react';

const LocationsView = () => {
    // const [refreshKey, setRefreshKey] = useState(0);
    return (
        <div className={styles.container}>
            <LocationTable />
        </div>
    )
}

export default LocationsView;