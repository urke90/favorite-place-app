export interface IPlacesState {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    address: string;
    location: ILocation;
    creatorId: string;
}

interface ILocation {
    lat: number;
    lng: number;
}
