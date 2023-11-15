import { useEffect, useState } from "react";
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
const IncrementoForm = () => {
  

    
    const [decretoTipo, setDecretoTipo] = useState(["2023", "2024", "2025"])
    
    const Decreto = decretoTipo.map(Decreto => Decreto )
    
    const handleDecretoTipoChange = (e) => console.log((decretoTipo[e.target.value]))
    function handleEnviar(e) {    
      console.log("Enviando ...");
    }
    function handleInput(e) {    
      
      const {name, value} = e.target;
      console.log(value);
      
    }
    const sel=(
      <>
        < select
        onChange={e => handleDecretoTipoChange(e)}
        className="border-2 p-2 w-mid rounded-lg text-center " >
        {
          Decreto.map((address, key) => <option value={key}>{address}</option>)
        }
        </select >
        <input type="submit" value="Submit" />
      </>
      );
    return (
      
      <>
        <br/>
        <div className="w-1/4 flex flex-col  ml-4">
            <label className="w-mid font-semibold">Incremento : </label>
            <input
              onChange={handleInput}
              type="number"
              step="0.01"
              className="border-2 p-2 rounded-lg text-center w-full"
              name="area1"
              
            ></input>
        </div>
        <div className="w-1/4 flex flex-col  ml-4">
            <label className="w-mid font-semibold">Decreto : </label>
            <input
              onChange={handleInput}
              type="text"
              className="border-2 p-2 rounded-lg text-center w-full"
              name="area"
              hint="d0001"
            ></input>
        </div>
        <br/>
        <label className="w-mid font-semibold">Vigencia : </label>
        < select
        onChange={e => handleDecretoTipoChange(e)}
        className="border-2 p-2 w-mid rounded-lg text-center " >
        {
          Decreto.map((address, key) => <option value={key}>{address}</option>)
        }
        </select >
        <br/>
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <button className="p-2 w-1/4 text-center  rounded-md  border-2  text-white bg-teal-500 "
          onClick={handleEnviar}
          >
            Guardar Incremento
          </button>
        </div>

      </>      
      
      );

      
  }
  export default IncrementoForm;