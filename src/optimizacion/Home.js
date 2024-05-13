import React, { useState, useEffect } from 'react';
import '../App.css';
import cocinandoImgUrl from './photos/cocinando.png';
import noCocinandoImgUrl from './photos/noCocinando.png';
import consumiendoImgUrl from './photos/comiendo.png';
import noConsumiendoImgUrl from './photos/noComiendo.png';
import comidaImgUrl from './photos/comida.png';

const BUFFER_SIZE = 5; // Tamano maximo del buffer

// Componente Productor
const Productor = ({ produciendo }) => {
  return (
    <div className="productor" style={{ backgroundImage: produciendo ? `url(${cocinandoImgUrl})` : `url(${noCocinandoImgUrl})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <p className='textImg'>Productor</p>
    </div>
  );
};

// Componente Consumidor
const Consumidor = ({ consumiendo }) => {
  return (
    <div className="consumidor" style={{ backgroundImage: consumiendo ? `url(${consumiendoImgUrl})` : `url(${noConsumiendoImgUrl})`,  backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <p className='textImg'>Consumidor</p>
    </div>
  );
};

// Componente Buffer
const Buffer = ({ buffer }) => {
  return (
    <div className="buffer">
      <h2>Buffer de Comida</h2>
      <div className="buffer-content">
        {buffer.map((item, index) => (
          <div key={index} className="buffer-item">
            <img src={item} style={{ height: 60, width: 100 }} alt="producto" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente principal que engloba todos los demas componentes
const Optimizacion = () => {
  const [buffer, setBuffer] = useState([]);
  const [productorActivo, setProductorActivo] = useState(false);
  const [consumidorActivo, setConsumidorActivo] = useState(false);

  useEffect(() => {
    let producirInterval, consumirInterval;

    if (productorActivo) {
      producirInterval = setInterval(() => {
        if (buffer.length < BUFFER_SIZE) {
          setBuffer(prevBuffer => [...prevBuffer, comidaImgUrl]);
        } else {
          setProductorActivo(false); // Desactivar el productor cuando el buffer esta lleno
          setTimeout(() => setConsumidorActivo(true), 1000); // Avitar el consumidor despues de 1 segundos
        }
      }, 900); // Agregar una nueva comida cada segundo mientras el productor esta activo
    }

    if (consumidorActivo) {
      consumirInterval = setInterval(() => {
        if (buffer.length > 0) {
          setBuffer(prevBuffer => prevBuffer.slice(1));
        } else {
          setConsumidorActivo(false); // Desactivar el consumidor cuando el buffer esta vacio
          setTimeout(() => setProductorActivo(true), 1000); // Activar el productor despues de 1 segundos
        }
      }, 900); // Consumir una comida cada 0.9 segundos mientras el consumidor esta activo
    }

    return () => {
      clearInterval(producirInterval);
      clearInterval(consumirInterval);
    };
  }, [buffer, productorActivo, consumidorActivo]);

  const iniciarSimulacion = () => {
    setProductorActivo(true);
  };

  return (
    <div className="app">
      <button onClick={iniciarSimulacion} className='botones'>Iniciar Simulación</button>
      <Productor produciendo={productorActivo} />
      <Buffer buffer={buffer} />
      <Consumidor consumiendo={consumidorActivo} />
    </div>
  );
};

export default Optimizacion;
