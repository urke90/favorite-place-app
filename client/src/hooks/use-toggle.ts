import { useState, useCallback } from 'react';

const useToggle = (initState: boolean = false): [boolean, () => void] => {
    const [state, setState] = useState(initState);

    const toggleStateHandler = useCallback(
        (): void => setState((state) => !state),
        []
    );

    return [state, toggleStateHandler];
};

export default useToggle;
