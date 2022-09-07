
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/UI/navbar/Navbar';
import About from './pages/About';
import Posts from './pages/Posts';
import Error from './pages/Error';
import './styles/App.css';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(()=> {
		if(localStorage.getItem('auth')){
			setIsAuth(true)
		}
		setLoading(false)
	},[])
	return (
		<AuthContext.Provider value={{
			isAuth,
			setIsAuth,
			isLoading
		 }}>
			<BrowserRouter>
				<Navbar/>
				<AppRouter/>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
