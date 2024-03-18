import React, {useState, useEffect} from "react";
import { filosofo1, filosofo2, filosofo3, filosofo4, filosofo5 } from "./photos";

const Filosofos = () => {

    const [tenedores, setTenedores] = useState([{status: true},{status: true},{status: true},{status: true},{status: true}])
    const [filosofos, setFilosofos] = useState([
        {id: 1,photo: filosofo1, status: 'esperando'},                
        {id: 2,photo: filosofo2, status: 'esperando'},            
        {id: 3,photo: filosofo3, status: 'esperando'},            
        {id: 4,photo: filosofo4, status: 'esperando'},            
        {id: 5,photo: filosofo5, status: 'esperando'},            
    ])// obj de los filosofos y tenedores para darles un estado

    const [flag, setFlag] = useState(false) // flag para saber cuando inicia todo

    useEffect(() => {
        if (flag) {
            filosofos.forEach(filosofo => {
                filosofoHandler(filosofo.id)
            })
        }
    }, [flag]) // esto se ejecuta cada cambio en el estado de flag y cuando se activa activa las funciones para cada filosofo

    const start = () => {
        setFlag(true)
    }

    const monitor = (id) => {
        if(id !== 5)
            if(tenedores[id-1].status === true && tenedores[id].status === true){
                setTenedores([...tenedores], tenedores[id-1].status = false)
                setTenedores([...tenedores], tenedores[id].status = false)
                return true
            }else
                return false
        if(tenedores[id-1].status === true && tenedores[0].status === true){
            setTenedores([...tenedores], tenedores[id-1].status = false)
            setTenedores([...tenedores], tenedores[0].status = false)
            return true
        }else
            return false
    } // el monitor es el que da recursos 

    const filosofoHandler = (id) => {
        let response = monitor(id) // toma la respuesta del monitor
        if(response === false){
            const tryAgain = setTimeout(() => {
                clearTimeout(tryAgain)
                filosofoHandler(id)
            }, 5000) // si no consiguio tenedor lo vuelve a intentar dentro de 5s
        }
        else if(response === true){
            setFilosofos([...filosofos], filosofos[id-1].status = "comiendo")
            const desocupar = setTimeout(() => {
                if(id !== 5){
                    setTenedores([...tenedores], tenedores[id-1].status = true)
                    setTenedores([...tenedores], tenedores[id].status = true)
                }
                else{
                    setTenedores([...tenedores], tenedores[id-1].status = true)
                    setTenedores([...tenedores], tenedores[0].status = true)
                }
                setFilosofos([...filosofos], filosofos[id-1].status = "Filosofando")
                clearTimeout(desocupar)
            }, 3000) // si si consiguio tenedor despues de 5s lo suela y se pone a pensar o filosofar sobre la vida 
        }
    };
    
    return(
        <div className="filosofosContainer">
            <div className="filosofosCenter">
                <button onClick={start} className="botones">Iniciar</button>
                <div className="filosofosMain">
                    <div className="filosofos">
                    {filosofos.map(filosofo => {
                        return(
                            <div key={filosofo.id} className="filosofo">
                                <img src={filosofo.photo} className="imgFilosofo"/>
                                <p style={filosofo.status == "comiendo" ? {color: "#0f0"} : filosofo.status == "esperando" ? {color: "#f00"}: {color: "#00f"}} className="textFilosofo">Estado: {filosofo.status}</p>
                            </div>
                        )
                    })}
                    </div>
                    <div className="tenedores">
                    {tenedores.map((tenedor, index) => {
                        return(
                            <div key={index} className="tenedor">
                                <p style={tenedor.status ? {color: "#0f0"} : {color: "#f00"}}>Tenedor {index+1}: {tenedor.status ? "Disponible" : "Ocupado"}</p>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filosofos