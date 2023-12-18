import { useEffect, useState,useRef } from "react";
import ZonaGeo from "../Json/zonaGeoEconomica.json";
import TablaCatastral from "../Json/prueba.json";
import TablaVivienda from "../Json/vivienda.json";
import Loader from "./Loader";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
////acordeon
//import Accordion from '../../node_modules/react-bootstrap/Accordion/package.json';
//import {Accordion} from 'react-bootstrap/Accordion/package.json';
import {Accordion,AccordionItem,AccordionItemHeading,AccordionItemButton, AccordionItemPanel} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import tramites from "../Json/tramites.json";
import predioPrueba from "../Json/predioPrueba.json";
import inscribe from "../Json/predioPruebaInscribe.json";
import '../Styles/TramiteDetalle.css'
import 'reactjs-popup/dist/index.css';
import Terreno from "./Terreno";
//////////////////



const TramiteDetalleForm = () => {
  

    
    const [vigenciaTipo, setVigenciaTipo] = useState(["2023", "2024", "2025"])
    const [jsonValues,setJsonValues] = useState(  
      {
        clasificacion_mutacion: 153,
        numero_resolucion:"res 0002",
        fecha_resolucion:"2023-12-06",
        fecha_radicacion:"2023-11-06",
        ric_predio: 1
      }
    )
    const interesado = Array(Object(predioPrueba.data.Predio[0].derechos[0].interesado_lc_interesado))//Se convierte a array porque en Json no es array
    const interesadoInscribe = Array(Object(inscribe.data.Predio[0].derechos[0].interesado_lc_interesado))
    const predio = (Object(predioPrueba.data.Predio))
    const derecho = (Object(predioPrueba.data.Predio[0].derechos))
    const derechoInscribe = (Object(inscribe.data.Predio[0].derechos))
    const fuenteAdministrativa = (Object(predioPrueba.data.Predio[0].derechos[0].fuenteadministrativa))
    const fuenteAdministrativaInscribe = (Object(inscribe.data.Predio[0].derechos[0].fuenteadministrativa))
    const terreno = Array(Object(predioPrueba.data.Predio[0].terreno))
    var construccion = []
    var unidadConstruccion = []
    //const construccion = predioPrueba.data.Predio[0].construccion
    //const data = Object(tramites.Tramites);//en este caso no se convierte a Array porque en Json ya esta en Array
    //console.log(data)    
    //console.log(predio)
//    console.log(predio[0].construccion)
    for (let i = 0; i < predio.length; i++) {
            for (var j = 0; j < predio[i].construccion.length; j++) {
                construccion.push(predio[i].construccion[j])
                    }
    }
    for (let i = 0; i < predio.length; i++) {
        for (var j = 0; j < predio[i].unidad_construccion.length; j++) {
            unidadConstruccion.push(predio[i].unidad_construccion[j])
                }
    }    
    console.log(construccion)
    console.log((interesado))//
    console.log(unidadConstruccion)
    console.log(derecho)
    console.log(fuenteAdministrativa)
    //console.log((construccion))//
    const [open, setOpen] = useState(false);  
    const closeModal = () => setOpen(false);
    const ref = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    function handleInput(e) {          
        const {name, value} = e.target;
        jsonValues.clasificacion_mutacion=parseInt(value)
        console.log(value);        
      }
      function handleInput1(e) {          
        const {name, value} = e.target;
        jsonValues.numero_resolucion=value
        console.log(value);        
      }
      function handleInput2(e) {          
        const {name, value} = e.target;
        jsonValues.fecha_resolucion=value
        console.log(value);        
      }
      function handleInput3(e) {          
        const {name, value} = e.target;
        jsonValues.fecha_radicacion=value
        console.log(value);        
      }
      function handleInput4(e) {          
        const {name, value} = e.target;
        jsonValues.ric_predio=parseInt(value)
        //console.log(value);           
        console.log(ref4.current.value);  
      }                        
      async function postJSON(data) {
        try {
          const response = await fetch("http://localhost/api/v1/ric-tramite-catastral/local", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            
          });
      
          const result = await response.json();
          console.log("Success:", result);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    
      function handleEnviar(e) {    
        console.log("Enviando ...");
        const jsonEnviar={"clasificacion_mutacion":jsonValues.clasificacion_mutacion,"numero_resolucion":jsonValues.numero_resolucion,"fecha_resolucion": jsonValues.fecha_resolucion,"ric_predio": jsonValues.ric_predio}
        console.log(jsonEnviar)
        console.log(jsonValues)
        postJSON(jsonEnviar);
      }

    return(
    <>
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-opacity-80 text-left">
      <h3> Detalles del Tramite </h3>


      <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Interesado
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <table className="w-full text-center">
                        <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                        <tr>

                            <th className="border-2 rounded-xl p-2">Id</th>
                            <th className="border-2 rounded-xl p-2">Tipo de Tramite</th>
                            <th className="border-2 rounded-xl p-2">Tipo Documento</th>
                            <th className="border-2 rounded-xl p-2">Numero de Documento</th>
                            <th className="border-2 rounded-xl p-2">Primer Nombre</th>
                            <th className="border-2 rounded-xl p-2">Segundo Nombre</th>
                            <th className="border-2 rounded-xl p-2">Primer Apellido</th>
                            <th className="border-2 rounded-xl p-2">Segundo Apellido</th>
                            <th className="border-2 rounded-xl p-2">Genero</th>
                            <th className="border-2 rounded-xl p-2">Grupo Etnico</th>
                            <th className="border-2 rounded-xl p-2">Razon Social</th>
                            <th className="border-2 rounded-xl p-2">Estado Civil</th>
                            <th className="border-2 rounded-xl p-2">Accion</th>
                        </tr>
                        </thead>
                        <tbody>

                    {
                    (interesado).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.tipo}</td>
                        <td>{registro.tipo_documento}</td>
                        <td>{registro.documento_identidad}</td>
                        <td>{registro.primer_nombre}</td>
                        <td>{registro.segundo_nombre}</td>
                        <td>{registro.primer_apellido}</td>
                        <td>{registro.segundo_apellido}</td>
                        <td>{registro.sexo}</td>
                        <td>{registro.grupo_etnico}</td>
                        <td>{registro.razon_social}</td>
                        <td>{registro.estado_civil}</td>
                        <td>Cancela</td>
                    </tr>)
                    
                    }
                    {
                    (interesadoInscribe).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.tipo}</td>
                        <td>{registro.tipo_documento}</td>
                        <td>{registro.documento_identidad}</td>
                        <td>{registro.primer_nombre}</td>
                        <td>{registro.segundo_nombre}</td>
                        <td>{registro.primer_apellido}</td>
                        <td>{registro.segundo_apellido}</td>
                        <td>{registro.sexo}</td>
                        <td>{registro.grupo_etnico}</td>
                        <td>{registro.razon_social}</td>
                        <td>{registro.estado_civil}</td>
                        <td>Inscribe</td>
                    </tr>)
                    
                    }                    

                        </tbody>
                    </table>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Predio
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <table className="w-full min-w-max table-auto text-center">
                        <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                        <tr>
                            <th className="border-2 rounded-xl p-2">Id</th>
                            <th className="border-2 rounded-xl p-2">Departamento</th>
                            <th className="border-2 rounded-xl p-2">Municipio</th>
                            <th className="border-2 rounded-xl p-2">Tiene FMI?</th>
                            <th className="border-2 rounded-xl p-2">Codigo Orip</th>
                            <th className="border-2 rounded-xl p-2">Matricula Inmobiliaria</th>
                            <th className="border-2 rounded-xl p-2">Numero Predial</th>
                            <th className="border-2 rounded-xl p-2">Numero Predial Anterior</th>

                        </tr>
                        </thead>
                        <tbody>

                    {
                    (predio).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.Departamento}</td>
                        <td>{registro.Municipio}</td>
                        <td>{registro.Tiene_FMI+""}</td>
                        <td>{registro.Codigo_ORIP}</td>
                        <td>{registro.Matricula_Inmobiliaria}</td>
                        <td>{registro.Numero_Predial}</td>
                        <td>{registro.Numero_predial_Anterior}</td>

                    </tr>)
                    }

                        </tbody>
                    </table>
                    <table className="w-full min-w-max table-auto text-center">
                        <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                        <tr>

                            
                            <th className="border-2 rounded-xl p-2">Codigo Homologado</th>
                            <th className="border-2 rounded-xl p-2">Interrelacionado</th>
                            <th className="border-2 rounded-xl p-2">Interrelacionado FMI</th>
                            <th className="border-2 rounded-xl p-2">NUPRE</th>
                            <th className="border-2 rounded-xl p-2">Avaluo Catastral</th>
                            <th className="border-2 rounded-xl p-2">Valor Catastral</th>
                            <th className="border-2 rounded-xl p-2">Valor de Referencia</th>
                            <th className="border-2 rounded-xl p-2">Accion</th>
                        </tr>
                        </thead>
                        <tbody>

                    {
                    (predio).map((registro,key) => 
                    <tr value={key}>                        

                        
                        <td>{registro.Codigo_Homologado}</td>
                        <td>{registro.interrelacionado}</td>
                        <td>{registro.interrelacionado_FMI}</td>
                        <td>{registro.NUPRE}</td>
                        <td>{registro.Avaluo_Catastral}</td>
                        <td>{registro.Valor_Catastral}</td>
                        <td>{registro.Valor_Referencia}</td>
                        <td>Na</td>
                    </tr>)
                    }

                        </tbody>
                    </table>                    
                </AccordionItemPanel>
            </AccordionItem>  
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Información Jurídica
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <h3><b>Derecho</b></h3>
                    <table className="w-full text-center">
                        <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                        <tr>
                            <th className="border-2 rounded-xl p-2">Id</th>
                            <th className="border-2 rounded-xl p-2">Tipo</th>
                            <th className="border-2 rounded-xl p-2">Fraccion Derecho</th>
                            <th className="border-2 rounded-xl p-2">Fecha Inicio Tenencia</th>
                            
                            <th className="border-2 rounded-xl p-2">Acción</th>
                        </tr>
                        </thead>
                        <tbody>
                    {
                    (derecho).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.tipo.dispname}</td>
                        <td>{registro.fraccion_derecho}</td>
                        <td>{registro.fecha_inicio_tenencia}</td>
                        
                        <td>Cancela</td>
                    </tr>)
                    }
                    {
                    (derechoInscribe).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.tipo.dispname}</td>
                        <td>{registro.fraccion_derecho}</td>
                        <td>{registro.fecha_inicio_tenencia}</td>
                        
                        <td>Inscribe</td>
                    </tr>)
                    }                    
                        </tbody>
                    </table>
                    <h3><b>Fuente Administrativa</b></h3>
                    <table className="w-full text-center">
                        <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                        <tr>
                            <th className="border-2 rounded-xl p-2">Id</th>
                            <th className="border-2 rounded-xl p-2">Tipo</th>
                            <th className="border-2 rounded-xl p-2">Ente Emisor</th>
                            <th className="border-2 rounded-xl p-2">Observación</th>
                            <th className="border-2 rounded-xl p-2">Numero de Fuente</th>
                            <th className="border-2 rounded-xl p-2">Estado Disponibilidad</th>
                            <th className="border-2 rounded-xl p-2">Tipo Principal</th>
                            <th className="border-2 rounded-xl p-2">Fecha Documento Fuente</th>
                            <th className="border-2 rounded-xl p-2">Espacio de Nombres</th>
                            <th className="border-2 rounded-xl p-2">Acción</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                    {
                    (fuenteAdministrativa).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.tipo.dispname}</td>
                        <td>{registro.ente_emisor}</td>
                        <td>{registro.observacion}</td>
                        <td>{registro.numero_fuente}</td>
                        <td>{registro.estado_disponibilidad.dispname}</td>
                        <td>{registro.tipo_principal}</td>
                        <td>{registro.fecha_documento_fuente}</td>
                        <td>{registro.espacio_de_nombres}</td>
                        <td>Cancela</td>
                    </tr>)
                    }
                    {
                    (fuenteAdministrativaInscribe).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.tipo.dispname}</td>
                        <td>{registro.ente_emisor}</td>
                        <td>{registro.observacion}</td>
                        <td>{registro.numero_fuente}</td>
                        <td>{registro.estado_disponibilidad.dispname}</td>
                        <td>{registro.tipo_principal}</td>
                        <td>{registro.fecha_documento_fuente}</td>
                        <td>{registro.espacio_de_nombres}</td>
                        <td>Inscribe</td>
                    </tr>)
                    }                    
                        </tbody>
                    </table>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Terreno
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <h3><b>Terreno</b></h3>
                    <table className="w-full text-center">
                        <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                        <tr>
                            <th className="border-2 rounded-xl p-2">Id</th>
                            <th className="border-2 rounded-xl p-2">Area de Terreno</th>
                            <th className="border-2 rounded-xl p-2">Avaluo Terreno</th>
                            <th className="border-2 rounded-xl p-2">Codigo Manzana Vereda</th>
                                                        
                        </tr>
                        </thead>
                        <tbody>

                    {
                    (terreno).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.area_terreno}</td>
                        <td>{registro.avaluo_terreno}</td>
                        <td>{registro.manzana_vereda_codigo}</td>
                        
                    </tr>)
                    }
                  
                        </tbody>
                    </table>
                </AccordionItemPanel>
            </AccordionItem>            
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Construcción
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <h3><b>Construcción</b></h3>

                    <table className="w-full text-center">
                        <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                        <tr>
                            <th className="border-2 rounded-xl p-2">Id</th>
                            <th className="border-2 rounded-xl p-2">Area Construida</th>
                            <th className="border-2 rounded-xl p-2"># pisos</th>
                            <th className="border-2 rounded-xl p-2"># Sotanos</th>
                            <th className="border-2 rounded-xl p-2"> # Mezanines </th>
                            <th className="border-2 rounded-xl p-2"> #Semisotanos </th>
                            <th className="border-2 rounded-xl p-2"> Año Construcción </th>
                            <th className="border-2 rounded-xl p-2"> Altura </th>
                            <th className="border-2 rounded-xl p-2"> Observaciones </th>
                                                        
                        </tr>
                        </thead>
                        <tbody>

                    {
                    (construccion).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.area_construccion}</td>
                        <td>{registro.numero_pisos}</td>
                        <td>{registro.numero_sotanos}</td>
                        <td>{registro.numero_mezanines}</td>
                        <td>{registro.numero_semisotanos}</td>
                        <td>{registro.anio_construccion}</td>
                        <td>{registro.altura}</td>
                        <td>{registro.observaciones}</td>
                        
                    </tr>)
                    }
                  
                        </tbody>
                    </table>
                </AccordionItemPanel>
            </AccordionItem>                     
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Unidad de Construcción
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <h3><b>Unidad de Construcción</b></h3>
                    <table className="w-full text-center">
                        <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                        <tr>
                            <th className="border-2 rounded-xl p-2">Id</th>
                            <th className="border-2 rounded-xl p-2">Area Construida</th>
                            <th className="border-2 rounded-xl p-2">Calificación Convencional</th>
                            <th className="border-2 rounded-xl p-2">Calificación No Convencional</th>
                            <th className="border-2 rounded-xl p-2">Uso</th>

                                                        
                        </tr>
                        </thead>
                        <tbody>

                    {
                    (unidadConstruccion).map((registro,key) => 
                    <tr value={key}>                        
                        <td>{registro.t_id}</td>
                        <td>{registro.area_construida}</td>
                        <td>{registro.lc_caracteristicasunidadconstruccion.calificacionconvencional.total_calificacion}</td>
                        <td>{registro.lc_caracteristicasunidadconstruccion.calificacionnoconvencional.total_calificacion}</td>
                        <td>{registro.lc_caracteristicasunidadconstruccion.uso.dispname}</td>
                    </tr>)
                    }
                  
                        </tbody>
                    </table>
                </AccordionItemPanel>
            </AccordionItem>    
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Ric Tramite Catastral
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <br/>
                    <div className=" flex justify-center items-center w-full mb-3">
                    
                        <div className="w-1/4 flex flex-col  ml-4 ">
                            <label className="w-mid font-semibold">Clasificacion Mutacion : </label>
                            <input
                            onChange={handleInput}
                            type="number"
                            step="1"
                            className="border-2 p-2 rounded-lg text-center w-full"
                            name="area1"      
                            ref={ref}                  
                            ></input>                        
                        </div>          
                        <div className="w-1/4 flex flex-col  ml-4 ">
                            <label className="w-mid font-semibold">Numero de Resolucion : </label>
                            <input
                            onChange={handleInput1}
                            type="text"
                            step="0.01"
                            className="border-2 p-2 rounded-lg text-center w-full"
                            name="area1"    
                            ref={ref1}                    
                            ></input>                        
                        </div>
                                                  
                    </div>
                    <div className=" flex justify-center items-center w-full mb-3">
                        <div className="w-1/4 flex flex-col  ml-4 ">
                            <label className="w-mid font-semibold">Fecha Resolucion : </label>
                            <input
                            onChange={handleInput2}
                            type="text"
                            step="0.01"
                            className="border-2 p-2 rounded-lg text-center w-full"
                            name="area1"                        
                            ref={ref2}
                            ></input>                    
                        </div>
                        <div className="w-1/4 flex flex-col  ml-4 ">
                            <label className="w-mid font-semibold">Fecha Radicación : </label>
                            <input
                            onChange={handleInput3}
                            type="text"
                            step="0.01"
                            className="border-2 p-2 rounded-lg text-center w-full"
                            name="area1"
                            ref={ref3}                        
                            ></input>                        
                        </div>
                        <div className="w-1/4 flex flex-col  ml-4 ">
                            <label className="w-mid font-semibold">Ric Predio : </label>
                            <input
                            onChange={handleInput4}
                            type="number"
                            step="1"
                            className="border-2 p-2 rounded-lg text-center w-full"
                            name="area1"
                            ref={ref4} id="box"
                            ></input>                        
                        </div>
                    </div>                    
                    <br/>
                    <br/>
                    <div className="w-full flex flex-col items-center justify-center mt-4">
                    <button className="p-2 w-1/4 text-center  rounded-md  border-2  text-white bg-teal-500 "
                    onClick={handleEnviar}
                    >
                        Guardar Tramite
                    </button>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>                                          
        </Accordion>      
        </div>
    </>
    )
}
export default TramiteDetalleForm;
/*
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Construcción
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>Hola</p>
                </AccordionItemPanel>
            </AccordionItem> 
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Detalles
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <table className="w-full text-center">
                        <thead className="uppercase border-2  bg-teal-500 text-base text-white">
                        <tr>
                            <th className="border-2 rounded-xl p-2">Radicado</th>
                            <th className="border-2 rounded-xl p-2">Id</th>
                            <th className="border-2 rounded-xl p-2">Tipo de Tramite</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                (tramites.Tramites).map((tramite,key) => 
                                <tr value={key}>                        
                                    <td>{tramite.Radicado}</td>
                                    <td>{tramite.id}</td>
                                    <td>
                                        <div className="w-sm flex flex-col items-center justify-center mt-4">
                                            <Popup trigger=
                                                {<button className="p-2 w-1/8 text-center  rounded-md  border-2  text-white bg-teal-500 "> Detalles </button>} 
                                                modal nested>
                                                {
                                                    close => (
                                                        <div className='modal'>
                                                            <div className='content'>
                                                                Welcome to GFG!!!
                                                            </div>
                                                            <div>
                                                                <button onClick=
                                                                    {() => close()}>
                                                                        Close modal
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </Popup>                                                
                                        </div>
                                    </td>                                    
                                </tr>)
                            }
                        </tbody>
                </table>
                </AccordionItemPanel>
            </AccordionItem>
*/