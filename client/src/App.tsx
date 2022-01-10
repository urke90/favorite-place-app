import { Routes, Route, Navigate } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default App;
