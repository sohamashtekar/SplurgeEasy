import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouteWrapper from './components/RouteWrapper';

function App() {
    return (
        <BrowserRouter>
            <RouteWrapper />
        </BrowserRouter>
    );
}

export default App;
