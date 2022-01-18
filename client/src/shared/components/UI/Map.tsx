import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

interface ViewportProps {
    latitude: number;
    longitude: number;
    zoom?: number;
}

const Map: React.FC = () => {
    const [viewport, setViewport] = useState<ViewportProps>({
        latitude: 40.7127281,
        longitude: -74.0060152,
        zoom: 10
    });

    return (
        <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(viewport: ViewportProps) =>
                setViewport(viewport)
            }
        >
            <Marker
                latitude={40.7127281}
                longitude={-74.0060152}
                offsetLeft={-20}
                offsetTop={-10}
            >
                <FontAwesomeIcon
                    size="lg"
                    color="#ff0000"
                    spin
                    icon={faLocationArrow}
                />
            </Marker>
        </ReactMapGL>
    );
};

export default Map;
