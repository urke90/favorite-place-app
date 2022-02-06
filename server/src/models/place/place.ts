export interface IPlace {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    address: string;
    location: ILocation;
    creatorId: string;
}

export interface ILocation {
    lat: number;
    lng: number;
}
