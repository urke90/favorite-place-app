import { useState, useCallback } from 'react';

const useToggle = (initState: boolean = false) => {
    const [state, setState] = useState(initState);

    const toggleStateHandler = useCallback(
        (): void => setState((state) => !state),
        []
    );

    return [state, toggleStateHandler] as const;
};

export default useToggle;
