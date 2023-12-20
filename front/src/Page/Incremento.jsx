import { useEffect, useState } from "react";
import  Cookies  from "universal-cookie";
import useAuth from '../hooks//useAuth';
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
const IncrementoForm = () => {
  

    
    const [vigenciaTipo, setVigenciaTipo] = useState(["2023", "2024", "2025"])
    const [jsonValues,setJsonValues] = useState(  
      {
        incremento:0,
        decreto:"Na",
        vigencia:"2023"
      }
    )
    const cookies = new Cookies();
    
    
    const Vigencia = vigenciaTipo.map(Vigencia => Vigencia )
    
    async function postJSON(data,token) {
      try {
        const response = await fetch("http://localhost/api/v1/avaluo-catastral/calcular/incremento", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify(data),
          
        });
    
        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    

    function handleVigenciaTipoChange(e) { 
      console.log((vigenciaTipo[e.target.value]))
      jsonValues.vigencia=(vigenciaTipo[e.target.value])
    }
    function handleEnviar(e) {    
      console.log("Enviando ...");
      var jsonEnviar={"vigencia":jsonValues.vigencia,"incremento":jsonValues.incremento,"concepto": jsonValues.decreto}
      jsonEnviar={"vigencia":jsonValues.vigencia}//para pruebas de token
      console.log(jsonEnviar)
      console.log(jsonValues)
      var token = cookies.get('tk')
      //token = 'aaaa'
      postJSON(jsonEnviar,token);
    }
    function handleInput(e) {    
      
      const {name, value} = e.target;
      jsonValues.incremento=value
      console.log(value);
      console.log(cookies.get('tk'));
      
    }
    function handleInput2(e) {    
      
      const {name, value} = e.target;
      jsonValues.decreto=value
      console.log(value);
      
    }    
    const sel=(
      <>
        < select
        onChange={e => handleVigenciaTipoChange(e)}
        className="border-2 p-2 w-mid rounded-lg text-center " >
        {
          Vigencia.map((address, key) => <option value={key}>{address}</option>)
        }
        </select >
        <input type="submit" value="Submit" />
      </>
      );

    const { isAuthenticated, loading } = useAuth();
    //console.log("auth2 : "+isAuthenticated)
    return (
      
      <>
        <br/>
        {//isAuthenticated ? 
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
              onChange={handleInput2}
              type="text"
              className="border-2 p-2 rounded-lg text-center w-full"
              name="area"
              hint="d0001"
            ></input>
        </div>
        <br/>
        <label className="w-mid font-semibold">Vigencia : </label>
        < select
        onChange={e => handleVigenciaTipoChange(e)}
        defaultValue="2023"
        className="border-2 p-2 w-mid rounded-lg text-center " >
        {
          Vigencia.map((address, key) => <option value={key}>{address}</option>)
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
        // : 'No autenticado'
        }
      </>      
      
      );

      
  }
  export default IncrementoForm;