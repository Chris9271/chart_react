import './App.css';
import Logo from './components/Logo/Logo';
import Display from './components/Display/Display';
import React, {useState} from 'react';

const App = () => {
  const [dist, setDist] = useState("");
  
  return (
    <div className="container-fluid">
      <div className="row">
        <Logo dist={dist} setDist={setDist}/>
        <Display dist={dist} setDist={setDist}/>
      </div>
    </div>
  );
}

export default App;
