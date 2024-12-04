
import './Home.css';
import MainDash from '../MainDash/MainDash';
import RightSide from '../RightSide/RightSide';
import Sidebar from '../Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';




function App() {

  useEffect(() => {

    console.log("env", process.env.REACT_APP_API_URL)
    
    }, [])


  return (
    <div className="App">
      <div className='AppGlass'>
        <Sidebar />
        <MainDash />
        <RightSide />
      </div>
    </div>
  );
}

export default App;