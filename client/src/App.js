import React, { createContext, useReducer } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Errorpage from './components/Errorpage';
import { initialState, reducer } from './reducer/UseReducer';
export const UserContext = createContext();

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<>
			{' '}
			<UserContext.Provider value={{ state, dispatch }}>
				<Navbar />
				<Routes>
					<Route exact path='/' element={<Home />} />

					<Route exact path='/about' element={<About />} />

					<Route exact path='/contact' element={<Contact />} />

					<Route exact path='/signup' element={<Signup />} />

					<Route exact path='/login' element={<Login />} />

					<Route exact path='/logout' element={<Logout />} />

					<Route path='*' exact={true} element={<Errorpage />} />
				</Routes>
			</UserContext.Provider>
		</>
	);
};
export default App;
