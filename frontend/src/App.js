import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import AllRouter from './MainRouter/AllRouter';

function App() {
  const [dark,setDark]=React.useState(false);
  return (
    <div className="App" style={{backgroundColor:dark?"black":"white"}}>
      <Navbar cl={dark} drk={setDark}/>
      <AllRouter drk={dark}/>
    </div>
  );
}

export default App;
