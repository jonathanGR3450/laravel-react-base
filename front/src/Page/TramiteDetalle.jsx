import { useEffect, useState } from "react";
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
const TramiteDetalleForm = () => {
  

    
    const [vigenciaTipo, setVigenciaTipo] = useState(["2023", "2024", "2025"])
    const [jsonValues,setJsonValues] = useState(  
      {
        incremento:0,
        decreto:"Na",
        vigencia:"2023"
      }
    )
    return(
    <>
        <p>Hola</p>    
    </>
    )
}
export default TramiteDetalleForm;