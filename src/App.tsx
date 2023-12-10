import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import './App.scss';
import NotFound from './pages/NotFound';
import Coefficients from './pages/Сoefficients';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/coefficients' element={<Coefficients />}></Route>
					<Route path='/profile/:name' element={<Home />} />
					<Route path='*' element={<NotFound />}></Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
