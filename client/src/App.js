import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import { UseAuthContext } from './hooks/UseAuthContext';

//pages & components
import Home from './pages/home'
import Navbar from './components/navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const {user} = UseAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={user ? <Home/> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login/> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup/> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
