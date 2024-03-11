import React, { useState, useRef } from "react";

const Home = () => {
  const [procesos, setProcesos] = useState([]);
  const real = 2048,
    virtual = 2048,
    celda = 128;

  const divRefs = useRef([]);

  const start = () => {
    setProcesos([
      { size: 1024, color: "#00ff00", Endcolor: "#00dd00" },
      { size: 512, color: "#ff0000", Endcolor: "#dd0000" },
      { size: 256, color: "#0000ff", Endcolor: "#0000dd" },
      { size: 2048, color: "#f0ff0f", Endcolor: "#d0dd0d" },
    ]);

    let countReal = 0;
    let countVirtual = 0;

    procesos.forEach((proceso) => {
      for (let i = proceso.size; i > 0; i -= 128) {
        const currentDiv = divRefs.current[countReal];

        if (countReal < 16 && currentDiv) {
          currentDiv.style.backgroundColor = proceso.color;

          setTimeout(() => {
            currentDiv.style.backgroundColor = "#fff";
          }, 500 * countReal);

          countReal++;
        } else if (countReal >= 16 && countVirtual < 16) {
          const virtualDiv = divRefs.current[countReal + countVirtual];
          virtualDiv.style.backgroundColor = proceso.color;

          setTimeout(() => {
            virtualDiv.style.backgroundColor = "#fff";
          }, 8000 * countVirtual);

          countVirtual++;
        }
      }
    });
  };

  return (
    <div className="HomeContainer">
      <div className="HomeMenu">
        <h4 className="title">Procesos a entrar</h4>
        <ul>
          <li>
            <input type="color" defaultValue={"#00ff00"} /> Proceso 1 - 1024Mb
          </li>
          <li>
            <input type="color" defaultValue={"#ff0000"} /> Proceso 2 - 512Mb
          </li>
          <li>
            <input type="color" defaultValue={"#0000ff"} /> Proceso 3 - 256Mb
          </li>
          <li>
            <input type="color" defaultValue={"#f0ff0f"} /> Proceso 4 - 2048Mb
          </li>
        </ul>
        <button className="genericButon" onClick={start}>
          Comenzar
        </button>
      </div>
      <div className="HomeReal">
        <h4 className="title">Memoria Real - 2048Mb - Celda 128Mb</h4>
        <div className="containerReal">
          {Array.from({ length: real / celda }, (_, index) => (
            <div key={index} ref={(el) => (divRefs.current[index] = el)} className="divReal">
              {index * celda + celda}
            </div>
          ))}
        </div>
      </div>
      <div className="HomeVirtual">
        <h4 className="title">Memoria Virtual - Pagina 2048Mb</h4>
        <div className="containerReal">
          {Array.from({ length: virtual / celda }, (_, index) => (
            <div key={index} ref={(el) => (divRefs.current[index + 16] = el)} className="divReal">
              {index * celda + celda}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;