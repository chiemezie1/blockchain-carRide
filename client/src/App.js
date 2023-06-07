import './App.css';
import Navbar from './components/Navbar.js';
import Home from './components/Home';
import Profile from './components/Profile';
import About from './components/About';
import Register from './components/Register';
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/About" element={<About />}/>
          <Route path='/Register' element={<Register/>}/> 
        </Routes>
    </div>
  );
}
export default App;
