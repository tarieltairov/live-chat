import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Calculator from './components/calculator/Calculator';
import Header from './components/Header/Header';
import Longpulling from './components/LiveChat/Longpulling';
import Ws from './components/LiveChat/Ws';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Longpulling />} />
        <Route path='/ws' element={<Ws />} />
        <Route path='/calculator' element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
