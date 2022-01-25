import { useParams } from 'react-router-dom';
import { PlacesState } from 'models/places/places';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from 'shared/util/validatiors';
const DUMMY_PLACES: PlacesState[] = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u2'
    }
];

const UpdatePlace: React.FC = (props) => {
    const { placeId } = useParams();

    const placeToUpdate = DUMMY_PLACES.find((place) => place.id === placeId);

    if (!placeToUpdate) {
        return (
            <div>
                <h2 className="center">Place Not Found</h2>
            </div>
        );
    }

    return (
        <form className="place-form">
            <Input
                id="title"
                label="Title"
                element="input"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInputChange={() => {}}
                errorText="Please enter a valid title"
                existingValue={placeToUpdate.title}
            />
            <Input
                id="description"
                label="Description"
                element="textarea"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInputChange={() => {}}
                errorText="Please enter a valid title"
                existingValue={placeToUpdate.description}
            />
            <Button type="submit" disabled={true}>
                UPDATE
            </Button>
        </form>
    );
};

export default UpdatePlace;

/**
 * route ===> /place/place-id --- add to app.tsx  ----> DONE
 * na osnovu parama izvucem placeId - i pronajdem u dummy places ---> DONE
 * ako ne postoji mesto vratim div h2 Could not find place renderujem ---> DONE
 * 1. input --- title ---> validator ---> required, Please enter a valid title
 * 2. textarea- description ---> min-length err ---> Please enter a valid desc ( 5 characters min )
 * dodati defaultValue, valid props za input (valid ---> znaci da je vec validirano, ne mora opet)
 *
 * Input.tsx --- komp mora da prima 2 nova props ---> defaultValue, i valid ---> da je vec validirano i defaultvalue --- ako postoji place da popunimo inpute
 *
 * MORAMO DA REUSE REDUCER ZA PRAVLJENJE NEW PLACE DA  SE KORISTI I ZA UPDATE
 */
