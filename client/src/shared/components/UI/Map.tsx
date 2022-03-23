import { useRef, useCallback, useState, useEffect } from 'react';
import ReactMapGL, { Marker, MapRef } from 'react-map-gl';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Geocoder from 'react-map-gl-geocoder';

import ReactMapboxGl from 'react-mapbox-gl';

import { ILocation } from 'types/places/places';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MapBoxMap: React.FC<{
    onAddressChange?: (
        id: string,
        value: string | File,
        isValid: boolean
    ) => void;
    isCreatePlaceMode: boolean;
    initLocation?: { lat: number; lng: number };
    getAddressCoordinates?: (location: ILocation) => void;
}> = ({
    onAddressChange,
    isCreatePlaceMode = false,
    initLocation,
    getAddressCoordinates
}) => {
    const mapRef = useRef<MapRef>(null);

    const geocoderRef = useRef<{
        cachedResult: { matching_place_name?: string; place_name: string };
        geocoder: { _typeahead: { list } };
        matching_place_name: string;
        handleResults: () => void;
    }>(null);

    const [viewport, setViewport] = useState({
        latitude: initLocation?.lat || 0,
        longitude: initLocation?.lng || 0,
        zoom: initLocation ? 15 : 0,
        // boxZoom: isCreatePlaceMode ? false : true,
        // doubleClickZoom: isCreatePlaceMode ? false : true,
        // scrollZoom: isCreatePlaceMode ? false : true,
        // dragPan: isCreatePlaceMode ? false : true
        boxZoom: false,
        doubleClickZoom: false,
        scrollZoom: false,
        dragPan: false,
        interactive: false
    });

    const handleViewportChange = useCallback((newViewport) => {
        setViewport(newViewport);

        console.log('newViewPort', newViewport);
        console.log('mapRef', mapRef.current?.getMap());

        // if (isCreatePlaceMode) {
        //     const { matching_place_name, place_name } =
        //         geocoderRef.current!.cachedResult || {};

        //     const address: string = matching_place_name || place_name;

        //     getAddressCoordinates!({
        //         lat: newViewport.latitude,
        //         lng: newViewport.longitude
        //     });
        //     onAddressChange!('address', address, true);
        // }
    }, []);

    const bla = (param) => {
        console.log(
            'geocoderRef 111111111111111111111111',
            geocoderRef.current!.geocoder._typeahead.list.element
        );
        console.log(
            'geocoderRef 2222222222222222222222',
            geocoderRef.current!.geocoder._typeahead.list.element.style.display
        );
    };

    return (
        <ReactMapGL
            ref={mapRef}
            {...viewport}
            width="100%"
            height="100%"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={handleViewportChange}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker
                longitude={initLocation ? initLocation.lng : viewport.longitude}
                latitude={initLocation ? initLocation.lat : viewport.latitude}
                // anchor="bottom"
            >
                {/* <FontAwesomeIcon icon={faMapMarkerAlt} color="red" size="2x" /> */}
            </Marker>
            {isCreatePlaceMode && (
                <Geocoder
                    mapRef={mapRef}
                    ref={geocoderRef}
                    onViewportChange={handleViewportChange}
                    minLength={4}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    position="top-left"
                    // marker={false}
                />
            )}
        </ReactMapGL>
    );
};

export default MapBoxMap;
