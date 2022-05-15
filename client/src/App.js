import React from "react";
import './styles/App.css'
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navabar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";
import {useAuth} from "./hooks/useAuth";

function App() {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuthenticated = !!token

    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     if (localStorage.getItem('auth')) {
    //         setIsAuth(true)
    //     }
    //     setIsLoading(false)
    // }, []);

    return (
        <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter isAuthenticated={isAuthenticated}/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
