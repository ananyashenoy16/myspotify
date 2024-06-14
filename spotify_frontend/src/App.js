import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';
import '../src/output.css'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<div className="bg-blue-500">hi</div>}/>
          <Route path="/hello" element={<div>hello</div>}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
