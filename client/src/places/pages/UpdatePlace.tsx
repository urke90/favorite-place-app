const UpdatePlace: React.FC = (props) => {
    return <h2>Update Place Comp</h2>;
};

export default UpdatePlace;

/**
 * route ===> /place/place-id --- add to app.tsx
 * na osnovu parama izvucem placeId - i pronajdem u dummy places
 * ako ne postoji mesto vratim div h2 Could not find place renderujem
 * 1. input --- title ---> validator ---> required, Please enter a valid title
 * 2. textarea- description ---> min-length err ---> Please enter a valid desc ( 5 characters min )
 * dodati defaultValue, valid props za input (valid ---> znaci da je vec validirano, ne mora opet)
 *
 * Input.tsx --- komp mora da prima 2 nova props ---> defaultValue, i valid ---> da je vec validirano i defaultvalue --- ako postoji place da popunimo inpute
 *
 * MORAMO DA REUSE REDUCER ZA PRAVLJENJE NEW PLACE DA  SE KORISTI I ZA UPDATE
 */
