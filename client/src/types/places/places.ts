export interface IPlace {
    id: string;
    title: string;
    description: string;
    image: string;
    address: string;
    location: ILocation;
    creatorId: string;
}

interface ILocation {
    lat: number;
    lng: number;
}
