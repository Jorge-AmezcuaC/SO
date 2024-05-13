import React, { useState, useEffect } from 'react';

const Process = ({ id, turn, setTurn, start }) => {
  const [progress, setProgress] = useState(0); // Progreso del proceso

  useEffect(() => {
    const simulateProcess = async () => {
      while (!start || id !== turn) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular un tiempo de espera
      }
      let currentTime = 0;
      while (currentTime < 3000) { // Simular el trabajo dentro de la sección crítica
        await new Promise((resolve) => setTimeout(resolve, 100));
        currentTime += 100;
        setProgress((currentTime / 3000) * 100); // Actualizar el progreso
      }
      setTurn(turn + 1); // Pasar el turno al siguiente proceso
    };

    simulateProcess();
  }, [turn, id, setTurn, start]);

  return (
    <div className="process">
      <div className="process-info">
        <div>Proceso {id}</div>
        <div>Progreso: {progress.toFixed(2)}%</div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

const Concurrencia = () => {
  const [turn, setTurn] = useState(1); // Turno actual
  const [start, setStart] = useState(false);

  const startSimulation = () => {
    setStart(true);
  };

  return (
    <div>
      <div>
        <button onClick={startSimulation} className='botones'>Iniciar Simulación</button>
      </div>
      <div>
        {[1, 2, 3, 4, 5].map((id) => (
          <Process key={id} id={id} turn={turn} setTurn={setTurn} start={start} />
        ))}
      </div>
    </div>
  );
}

export default Concurrencia;
