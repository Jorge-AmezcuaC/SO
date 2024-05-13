import React from "react";
import { useState} from "react";
import '../App.css';

const Banaquero = () => {
    const cash = 15;
    const [availableCash, setAvailableCash] = useState(cash)
    const [newNu, setNewNu] = useState()
    const [algoritmo, setAlgoritmo] = useState(true)
    const [inversionista, setInversionista] = useState([
        {id: 1, status: false, name: "Inversionista 1", totalCashReq: 11, initialCash: 0, secondIncome: 0, cashReq: 11},
        {id: 2, status: false, name: "Inversionista 2", totalCashReq: 11, initialCash: 0, secondIncome: 0, cashReq: 11},
        {id: 3, status: false, name: "Inversionista 3", totalCashReq: 6, initialCash: 0, secondIncome: 0, cashReq: 6},
        {id: 4, status: false, name: "Inversionista 4", totalCashReq: 8, initialCash: 0, secondIncome: 0, cashReq: 8},
    ])
    
    function getRnd(min, max){
        let newN = Math.floor(Math.random() * (max - min)) + min;
        setNewNu(newN)
        return newN
    }

    const comp = (avCash) => {
        let solvencia = 0;
        for(let i = 0; i < 4; i++){
            if(inversionista[i].cashReq <= avCash || inversionista[i].cashReq ===! 0)solvencia++
        }
        if(solvencia > 0){return true}
        else return false
    }

    const evitarBloqueo = (finalCash, inversionistasArr) => {
        for(let i = 0; i < 4; i++)
            if(inversionistasArr[i].cashReq <= finalCash)
                return true
        return false
    }

    const simulacion = () => {
        const tmpInversionistas = [...inversionista];
        let newBalance = availableCash
        let i = 0, j = 0, x = 0, y = 0;

        function firstField(){
            if(i < 4){
                setInversionista(() => {
                    const newState = [...tmpInversionistas];
                    newState[i] = { ...newState[i], status: true };
                    return newState;
                });
                let tmpRnd = getRnd(1, tmpInversionistas[i].cashReq)
                if(tmpRnd < newBalance){
                    if(algoritmo){
                        if(evitarBloqueo(newBalance - tmpRnd, tmpInversionistas)){
                            tmpInversionistas[i].initialCash = tmpRnd
                            newBalance -= tmpRnd
                            tmpInversionistas[i].cashReq = tmpInversionistas[i].cashReq - tmpRnd
                        }
                    }else{
                        tmpInversionistas[i].initialCash = tmpRnd
                        newBalance -= tmpRnd
                        tmpInversionistas[i].cashReq = tmpInversionistas[i].cashReq - tmpRnd
                    }
                }else{
                    tmpInversionistas[i].initialCash = 0
                }
                if(tmpInversionistas[i].cashReq === 0)
                    newBalance += tmpInversionistas[i].totalCashReq
                setAvailableCash(newBalance)
                
                setTimeout(function() {
                    if(i < 4){    
                        setInversionista(() => {
                            const newState = [...tmpInversionistas];
                            if(i < 4)
                                newState[i] = { ...newState[i], status: false };
                            return newState;
                        });
                    }
                    i < 4 ? i++ : i = 4
                    if(comp(newBalance) === false){
                        alert("Se Bloqueo")
                        return null
                    }
                    firstField()
                }, 1000);
            }else{
                secondField()
            }
        }
        firstField()

        function secondField(){
            if(j < 4){
                setInversionista(() => {
                    const newState = [...tmpInversionistas];
                    newState[j] = { ...newState[j], status: true };
                    return newState;
                });
                const tmpRnd = getRnd(1, tmpInversionistas[j].cashReq)
                if(tmpRnd < newBalance){
                    if(algoritmo){
                        if(evitarBloqueo(newBalance - tmpRnd, tmpInversionistas)){
                            tmpInversionistas[j].secondIncome = tmpRnd
                            newBalance -= tmpRnd
                            tmpInversionistas[j].cashReq = tmpInversionistas[j].cashReq - tmpRnd
                        }
                    }else{
                        tmpInversionistas[j].secondIncome = tmpRnd
                        newBalance -= tmpRnd
                        tmpInversionistas[j].cashReq = tmpInversionistas[j].cashReq - tmpRnd
                    }
                }else{
                    tmpInversionistas[j].secondIncome = 0
                }
                if(tmpInversionistas[j].cashReq === 0)
                    newBalance += tmpInversionistas[j].totalCashReq
                setAvailableCash(newBalance)
                setTimeout(function() {
                    setInversionista(() => {
                        const newState = [...tmpInversionistas];
                        if(j < 4){    
                            newState[j] = { ...newState[j], status: false };
                        }
                        return newState;
                    });
                    j < 4 ? j++ : j = 4
                    if(comp(newBalance) === false){
                        alert("Se Bloqueo")
                        return null
                    }
                    secondField()
                }, 1000);
            }else{
                thirdPart()
            }
        }

        function thirdPart(){
            if(x < 4){
                setInversionista(() => {
                    const newState = [...tmpInversionistas];
                    newState[x] = { ...newState[x], status: true };
                    return newState;
                });
                setNewNu(tmpInversionistas[x].cashReq)
                if(tmpInversionistas[x].cashReq <= newBalance && tmpInversionistas[x].cashReq !== 0){
                    tmpInversionistas[x].secondIncome += tmpInversionistas[x].cashReq
                    newBalance -= tmpInversionistas[x].cashReq
                    tmpInversionistas[x].cashReq = 0;
                    newBalance += tmpInversionistas[x].totalCashReq
                    setAvailableCash(newBalance)
                }
                setTimeout(function() {
                    if(x < 4) x++
                    if(comp(newBalance) === false){
                        alert("Se Bloqueo")
                        return null
                    }
                    thirdPart()
                }, 1000);
            }else{
                y++
                if(y < 4){
                    x = 0;
                    thirdPart()
                }
            }
        }
    }

    return(
        <div className="lastHome">
            <button className="botones" onClick={simulacion}>Iniciar Simulacion</button>
            <table>
                <tr>
                    <th colSpan={5}>Tabla de Inversionistas</th>
                </tr>
                <tr>
                    <th>Nombre Del Acredor</th>
                    <th>Prestamo Requerido</th>
                    <th>Prestamo Actual</th>
                    <th>Futuros Prestamos</th>
                    <th>Dinero Faltante</th>
                </tr>
                {inversionista && inversionista.map(inv => {
                    return(
                        <tr key={inv.id} style={(inv.status ? {background: "#47aa98"}:{background: ""})}>
                            <td>{inv.name}</td>
                            <td>{inv.totalCashReq}</td>
                            <td>{inv.initialCash}</td>
                            <td>{inv.secondIncome}</td>
                            <td>{inv.cashReq}</td>
                        </tr>
                    )
                })}
            </table>

            <div className="total">
                <p>Dinero Del Banco: {availableCash}</p>
                <p>Solicitud: {newNu}</p>
            </div>
            <div className="secIndicador">
                <p>Anti Bloqueo activado :</p>
                <div style={(algoritmo ? {background: "#0f0"} : {background: "#f00"})} className="indicador" onClick={() => setAlgoritmo(!algoritmo)}></div>
            </div>

        </div>
    )
}

export default Banaquero