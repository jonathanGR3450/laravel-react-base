import { useEffect, useState } from "react";
import {useNavigate}  from 'react-router-dom';
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
import tramites from "../Json/tramites.json";
const TramitesForm = () => {
  
    const navigate = useNavigate();
    
    const [vigenciaTipo, setVigenciaTipo] = useState(["2023", "2024", "2025"])
    const [jsonValues,setJsonValues] = useState(  
      {
        incremento:0,
        decreto:"Na",
        vigencia:"2023"
      }
    )
      console.log(tramites.Tramites[0].id)
      const data = Object(tramites.Tramites);
      
      function handleEnviar(e) {  
        const navigate = useNavigate();  
        navigate(-1);
        
      }
    return(
        
        <>
            
            <pre>   </pre>
            <table className="w-full text-center">
                <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                <tr>
                    <th className="border-2 rounded-xl p-2">Radicado</th>
                    <th className="border-2 rounded-xl p-2">Id</th>
                    <th className="border-2 rounded-xl p-2">Tipo de Tramite</th>
                    <th className="border-2 rounded-xl p-2">Fecha Radicaion</th>
                    <th className="border-2 rounded-xl p-2">Tipo de Predio</th>
                    <th className="border-2 rounded-xl p-2">NPN</th>
                    <th className="border-2 rounded-xl p-2">Estado</th>
                    <th className="border-2 rounded-xl p-2">Fecha Notificación</th>
                    <th className="border-2 rounded-xl p-2">Metodo Notificación</th>
                    <th className="border-2 rounded-xl p-2">Observaciones</th>
                    <th className="border-2 rounded-xl p-2">Acciones</th>
                </tr>
                </thead>
                <tbody>

                    {
                    (tramites.Tramites).map((tramite,key) => 
                    <tr value={key}>                        
                        <td>{tramite.Radicado}</td>
                        <td>{tramite.id}</td>
                        <td>{tramite.tramiteTipo}</td>
                        <td>{tramite.radicacionFecha}</td>
                        <td>{tramite.predioTipo}</td>
                        <td>{tramite.npn}</td>
                        <td>{tramite.Estado}</td>
                        <td>{tramite.notificacionFecha}</td>
                        <td>{tramite.notificacionMetodo}</td>
                        <td>{tramite.observaciones}</td>
                        <td>
                            <div className="w-sm flex flex-col items-center justify-center mt-4">
                                <button className="p-2 w-1/8 text-center  rounded-md  border-2  text-white bg-teal-500 "
                                onClick={handleEnviar}
                                >
                                Detalles
                                </button>
                            </div>
                            <div className="w-sm flex flex-col items-center justify-center mt-4">
                                <button className="p-2 w-1/8 text-center  rounded-md  border-2  text-white bg-teal-500 "
                                onClick={handleEnviar}
                                >
                                Editar
                                </button>
                            </div>                             
                        </td>
                        
                    </tr>)
                    }

                </tbody>
            </table>

        </>
        )    
    
}
export default TramitesForm;