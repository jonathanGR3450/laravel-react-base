import { useEffect, useState } from "react";
import  Cookies  from "universal-cookie";
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
const RegistrarForm = () => {
  

    
    
    const [jsonValues,setJsonValues] = useState(  
      { 
        name:"aa@a.com",
        email:"aa@a.com",
        password:"password"
      }
    )
    const cookies = new Cookies();
    
    
    
    async function postJSON(data) {
      try {
        const response = await fetch("http://localhost/api/register", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
          
        });
    
        const result = await response.json();
        console.log("Success:", result);
        console.log("Success:", result.authorization.token);
        cookies.set('tk', result.authorization.token, { path: '/',sameSite:"lax" });
        console.log("Token Log Cookie:", cookies.get('tk'));
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
      console.log(cookies)
      const jsonEnviar={"name":jsonValues.name,email:jsonValues.email,"password":jsonValues.password}
      console.log(jsonEnviar)
      console.log(jsonValues)
      postJSON(jsonEnviar);
    }
    function handleInput0(e) {    
      
      const {name, value} = e.target;
      jsonValues.name=value
      console.log(value);
      
    }
    function handleInput1(e) {    
      
      const {name, value} = e.target;
      jsonValues.email=value
      console.log(value);
      
    }    
    function handleInput2(e) {    
      
        const {name, value} = e.target;
        jsonValues.password=value
        console.log(value);
        
      }        

    return (
      
      <>
        <br/>
        <div className="w-1/4 flex flex-col  ml-4">
            <label className="w-mid font-semibold">Nombre : </label>
            <input
              onChange={handleInput0}
              type="email"
              className="border-2 p-2 rounded-lg text-center w-full"
              name="area"
              hint="d0001"
            ></input>
        </div>        
        <div className="w-1/4 flex flex-col  ml-4">
            <label className="w-mid font-semibold">Correo : </label>
            <input
              onChange={handleInput1}
              type="email"
              className="border-2 p-2 rounded-lg text-center w-full"
              name="area"
              hint="d0001"
            ></input>
        </div>
        <div className="w-1/4 flex flex-col  ml-4">
            <label className="w-mid font-semibold">Contraseña : </label>
            <input
              onChange={handleInput2}
              type="password"
              className="border-2 p-2 rounded-lg text-center w-full"
              value="password"
              name="area"
              hint="d0001"
            ></input>
        </div>
        <div className="w-1/4 flex flex-col  ml-4">
            <label className="w-mid font-semibold">Repetir Contraseña : </label>
            <input
              onChange={handleInput2}
              type="password"
              className="border-2 p-2 rounded-lg text-center w-full"
              value="password"
              name="area"
              hint="d0001"
            ></input>
        </div>        
        <br/>

        <br/>
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <button className="p-2 w-1/4 text-center  rounded-md  border-2  text-white bg-teal-500 "
          onClick={handleEnviar}
          >
            Registrarse
          </button>
        </div>

      </>      
      
      );

      
  }
  export default RegistrarForm;