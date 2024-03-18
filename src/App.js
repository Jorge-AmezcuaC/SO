import './App.css';
import React from 'react'
import { useState } from 'react';
import Home from './virtualYreal/Home';
import Filosofos from './filosofos/Home';

const SwitchPage = (props) => {
  switch (props.page) {
    case 1:
      return <Home/>
    case 2:
      return <Filosofos/>
    case 3:
      return(
        <div>Bajo Desarrollo</div>
      )
    case 4:
      return(
        <div>Bajo Desarrollo</div>
      )
    default:
      return(
        <div>Seleccione una opcion para comenzar</div>
      )
  }
}

function App() {
  
  const [actualPage, setPage] = useState(0)

  return (
    <div className="App">
      <div className="menu">
        <button className='botones' onClick={() => setPage(1)}>Act 9 Memoria real y virtual</button>
        <button className='botones' onClick={() => setPage(2)}>Act 10 Problema de los filosofos</button>
        <button className='botones' onClick={() => setPage(3)}>Act 11 Concurrencias</button>
        <button className='botones' onClick={() => setPage(4)}>Act 12 Productor Consumidor</button>
      </div>
      <div className="main">
        <SwitchPage page={actualPage}/>
      </div>
    </div>
  );
}

export default App;
