import { Routes, Route, Navigate } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from 'shared/components/navigation/MainNavigation';

const App: React.FC = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/places/new" element={<NewPlace />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
