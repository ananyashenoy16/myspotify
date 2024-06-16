import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';
import '../src/output.css'
import Login from '../src/Routes/Login'
function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<div className="bg-blue-500">hi</div>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
