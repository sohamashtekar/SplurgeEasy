import './App.css';
import LandingPage from './components/landing-page/LandingPage';
import LogIn from './components/authentication/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />}></Route>
                <Route path='/login' element={<LogIn />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
