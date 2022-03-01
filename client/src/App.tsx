import MainNavigation from 'shared/components/navigation/MainNavigation';
import Router from 'router/Router';

const App: React.FC = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Router />
            </main>
        </>
    );
};

export default App;
