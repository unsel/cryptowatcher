import {BrowserRouter, Routes,Route} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/homepage/homepage.jsx';
import './App.css';

const App = props  =>{
  
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
