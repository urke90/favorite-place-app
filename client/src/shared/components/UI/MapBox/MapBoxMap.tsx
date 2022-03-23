import { useState, useRef } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Marker } from 'react-mapbox-gl';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

/**
 *
 // import 'mapbox-gl/dist/mapbox-gl.css';
 // import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
 */

const MapBoxMap: React.FC<{ coordinates: any }> = ({ coordinates }) => {
    const mapRef = useRef(null);

    const Map = ReactMapboxGl({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN!
        // interactive: false
    });

    const bla = (viewport, item) => {
        console.log('viewport', viewport);
        console.log('item', item);
    };

    console.log('coordinates', coordinates);

    return (
        <>
            <Map
                ref={mapRef}
                containerStyle={{
                    height: '100%',
                    width: '100%'
                }}
                style="mapbox://styles/mapbox/streets-v9"
                onMove={bla}
                center={coordinates}
                zoom={[16]}
            >
                {/* <Marker coordinates={coordinates.reverse()}>
                    <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        color="red"
                        size="2x"
                    />
                </Marker> */}
                <Geocoder
                    mapRef={mapRef}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={() => {}}
                    position="top-left"
                />
            </Map>
        </>
    );
};

export default MapBoxMap;
