export interface Places {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    address: string;
    location: Location;
    creatorId: string;
}

interface Location {
    lat: number;
    lng: number;
}

export interface PlacesProps extends Places {}
