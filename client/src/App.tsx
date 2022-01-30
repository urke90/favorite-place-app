import AuthContextProvider from 'context/AuthContext';
import MainNavigation from 'shared/components/navigation/MainNavigation';
import Router from 'router/Router';

const App: React.FC = () => {
    return (
        <AuthContextProvider>
            <MainNavigation />
            <main>
                <Router />
            </main>
        </AuthContextProvider>
    );
};

export default App;
