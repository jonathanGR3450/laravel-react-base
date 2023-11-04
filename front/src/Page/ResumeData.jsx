import React from "react";
import { Modal } from "./Modal";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
export const FuenteResumeForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataShow, setDataShow] = useState();
  const datos = props.datos;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  const mostrar = (data) => {
    const aux = data;
    let aux1 = aux.fuente_administrativa;
    let tipo_fuente = 0;
    let texto_fuente = 0;
    let tipo_principal = 0;
    switch (aux1.tipo_fuente) {
      case "45":
        tipo_fuente = "Documento Publico";
        break;
      case "46":
        tipo_fuente = "Documento Privado";
        break;
      case "50":
        tipo_fuente = "Escritura Publica (Doc Publico)";
        break;
      case "51":
        tipo_fuente = "Sentencia Judicial (Doc Publico)";
        break;
      case "52":
        tipo_fuente = "Acto Administrativo (Doc Publico)";
        break;
      case "54":
        tipo_fuente = "Sin Documento";
        break;
      default:
        tipo_fuente = "Valor no reconocido";
    }
    switch (aux1.estado_disponibilidad) {
      case "885":
        texto_fuente = "Convertido";
        break;
      case "886":
        texto_fuente = "Desconocido";
        break;
      case "887":
        texto_fuente = "Disponible";
        break;
      default:
        texto_fuente = "Valor no reconocido";
    }
    switch (aux1.tipo_principal) {
      case "18":
        tipo_principal = "Imagen";
        break;
      case "19":
        tipo_principal = "Documento";
        break;
      case "20":
        tipo_principal = "Mapa";
        break;
      case "21":
        tipo_principal = "Video";
        break;
      case "22":
        tipo_principal = "Otro";
        break;
      default:
        tipo_principal = "Valor no reconocido";
    }
    return (
      <div className="w-full">
        <h2 className="text-3xl">Datos de Fuente Administrativa</h2>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Tipo de Fuente: </label>
            <label>{tipo_fuente}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Ente Emisor: </label>
            <label>{aux1.ente_emisor}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Numero Fuente: </label>
            <label>{aux1.numero_fuente}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Estado Disponibilidad: </label>
            <label>{texto_fuente}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Tipo Principal: </label>
            <label>{tipo_principal}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Fecha Documento Fuente: </label>
            <label>{aux1.fecha_documento_fuente}</label>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {mostrar(datos)}
    </Modal>
  );
});
export const DerechoResumeForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const datos = props.datos;
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  const mostrar = (data) => {
    const aux = data;
    let aux1 = aux.derecho;
    let tipo_derecho = "";
    let tipo_restriccion = "";
    switch (aux1.tipo_derecho) {
      case "47":
        tipo_derecho = "Dominio";
        break;
      case "48":
        tipo_derecho = "Ocupacion";
        break;
      case "49":
        tipo_derecho = "Posesion";
        break;
      default:
        tipo_derecho = "Valor no reconocido";
    }
    switch (aux1.tipo_restriccion) {
      case "799":
        tipo_restriccion = "(Servidumbre) Tránsito";
        break;
      case "800":
        tipo_restriccion = "(Servidumbre) Aguas negras";
        break;
      case "801":
        tipo_restriccion = "(Servidumbre) Aire";
        break;
      case "802":
        tipo_restriccion = "(Servidumbre) Energía eléctrica";
        break;
      case "803":
        tipo_restriccion = "(Servidumbre) Gasoducto";
        break;
      case "804":
        tipo_restriccion = "(Servidumbre) Luz";
        break;
      case "805":
        tipo_restriccion = "(Servidumbre) Oleoducto";
        break;
      case "806":
        tipo_restriccion = "(Servidumbre) Agua";
        break;
      case "807":
        tipo_restriccion = "(Servidumbre) Minera";
        break;
      case "808":
        tipo_restriccion = "(Servidumbre) Legal de hidrocarburos";
        break;
      case "809":
        tipo_restriccion = "(Servidumbre) Medianería";
        break;
      case "810":
        tipo_restriccion = "(Servidumbre) Alcantarillado";
        break;
      case "811":
        tipo_restriccion = "(Servidumbre) Acueducto";
        break;
      default:
        tipo_restriccion = "Valor no reconocido";
    }
    return (
      <div className="w-full">
        <h2 className="text-3xl">Datos de Derecho</h2>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Tipo de Derecho: </label>
            <label>{tipo_derecho}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Tipo Restriccion: </label>
            <label>{tipo_restriccion}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Fecha Inicio Tenencia: </label>
            <label>{aux1.inicio_tenencia}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Fraccion Derecho: </label>
            <label>{aux1.fraccion_derecho}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Descripcion: </label>
            <label>{aux1.descripcion}</label>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {mostrar(datos)}
    </Modal>
  );
});
export const PredioResumeForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const datos = props.datos;
  console.log("datos predio", datos);
  const openModal = (aux) => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  const mostrar = (data) => {
    const aux = data;
    let aux1 = aux.predio;
    console.log("valores aux10", aux1);
    let tipo_predio = "";
    let condicion = "";
    let destinacion_economica = "";
    let clase_suelo = "";
    let categoria_suelo = "";
    //Tipo Predio
    switch (aux1.tipo) {
      case "888":
        tipo_predio = "(Predio) (Público) Baldío";
        break;
      case "889":
        tipo_predio = "(Predio) (Público) Fiscal";
        break;
      case "890":
        tipo_predio = "(Predio) (Público) Patrimonial";
        break;
      case "891":
        tipo_predio = "(Predio) (Público) Uso público";
        break;
      case "892":
        tipo_predio = "(Predio) (Público) Ejido";
        break;
      case "893":
        tipo_predio = "(Predio) Privado";
        break;
      case "894":
        tipo_predio = "(Predio) Territorio colectivo";
        break;
      case "895":
        tipo_predio = "(Predio) Vacante";
        break;
      case "896":
        tipo_predio = "Ordenamiento territorial";
        break;
      case "897":
        tipo_predio = "Servicios públicos";
        break;
      case "898":
        tipo_predio = "Reservas naturales";
        break;
      case "899":
        tipo_predio = "Parques naturales";
        break;
      case "900":
        tipo_predio = "Amenazas de riesgos";
        break;
      case "901":
        tipo_predio = "Servidumbre";
        break;
      case "902":
        tipo_predio = "Superficies de agua";
        break;
      case "903":
        tipo_predio = "Transporte";
        break;
      default:
        tipo_predio = "Valor no reconocido";
    }
    //Condicion Predio
    switch (aux1.condicion_predio) {
      case "442":
        condicion = "No propiedad horizontal";
        break;
      case "443":
        condicion = "(Propiedad horizontal) Matriz";
        break;
      case "444":
        condicion = "(Propiedad horizontal) Unidad Predial";
        break;
      case "445":
        condicion = "(Condominio) Matriz";
        break;
      case "446":
        condicion = "(Condominio) Unidad predial";
        break;
      case "447":
        condicion = "(Parque cementerio) Matriz";
        break;
      case "448":
        condicion = "(Parque Cementerio) Unidad predial";
        break;
      case "449":
        condicion = "Vía";
        break;
      case "450":
        condicion = "Informal";
        break;
      case "451":
        condicion = "Bien de uso público";
        break;
      case "903":
        condicion = "Mejora";
        break;
      default:
        condicion = "Valor no reconocido";
    }
    switch (aux1.clase_suelo) {
      case "84":
        clase_suelo = "Urbano";
        break;
      case "85":
        clase_suelo = "Rural";
        break;
      case "86":
        clase_suelo = "Expansión urbana";
        break;
      default:
        clase_suelo = "Valor no reconocido";
    }
    switch (aux1.categoria_suelo) {
      case "777":
        categoria_suelo = "Suburbano";
        break;
      case "778":
        categoria_suelo = "Protección";
        break;
      default:
        categoria_suelo = "Valor no reconocido";
    }
    switch (aux1.destinacion_economica) {
      case "162":
        destinacion_economica = "Acuícola";
        break;
      case "163":
        destinacion_economica = "Agrícola";
        break;
      case "164":
        destinacion_economica = "Agroindustrial";
        break;
      case "165":
        destinacion_economica = "Agropecuario";
        break;
      case "166":
        destinacion_economica = "Agroforestal";
        break;
      case "167":
        destinacion_economica = "Comercial";
        break;
      case "168":
        destinacion_economica = "Cultural";
        break;
      case "169":
        destinacion_economica = "Educativo";
        break;
      case "170":
        destinacion_economica = "Forestal";
        break;
      case "171":
        destinacion_economica = "Habitacional";
        break;
      case "172":
        destinacion_economica = "Industrial";
        break;
      case "173":
        destinacion_economica =
          "Infraestructura asociada a producción agropecuaria";
        break;
      case "174":
        destinacion_economica = "Infraestructura hidráulica";
        break;
      case "175":
        destinacion_economica = "Infraestructura de saneamiento básico";
        break;
      case "176":
        destinacion_economica = "Infraestructura seguridad";
        break;
      case "177":
        destinacion_economica = "Infraestructura transporte";
        break;
      case "178":
        destinacion_economica = "Institucional";
        break;
      case "179":
        destinacion_economica = "Minería e hidrocarburos";
        break;
      case "180":
        destinacion_economica = "Lote urbanizable no urbanizado";
        break;
      case "181":
        destinacion_economica = "Lote urbanizado no construido";
        break;
      case "182":
        destinacion_economica = "Lote no urbanizable";
        break;
      case "183":
        destinacion_economica = "Pecuario";
        break;
      case "184":
        destinacion_economica = "Recreacional";
        break;
      case "185":
        destinacion_economica = "Religioso";
        break;
      case "186":
        destinacion_economica = "Salubridad";
        break;
      case "187":
        destinacion_economica = "Servicios funerarios";
        break;
      case "188":
        destinacion_economica = "Uso público";
        break;
      default:
        destinacion_economica = "Valor no reconocido";
    }
    //Clase Suelo
    return (
      <div className="w-full">
        <h2 className="text-3xl">Datos de Predio</h2>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Departamento: </label>
            <label>Cundinamarca</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Municipio: </label>
            <label>Fusagasugá</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Matricula Inmobiliaria: </label>
            <label>{aux1.matricula_inmobiliaria}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Numero Predial: </label>
            <label>{aux1.numero_predial}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Codigo Homologado: </label>
            <label>{aux1.codigo_homologado}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Avaluo Catrastral: </label>
            <label>{aux1.avaluo_catastral}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Tiene FMI: </label>
            <label>{aux1.tiene_fmi ? "Si" : "No"}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Interrelacionado: </label>
            <label>{aux1.interrelacionado ? "Si" : "No"}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Codigo Homologado FMI: </label>
            <label>{aux1.codigo_homologado_fmi ? "Si" : "No"}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">NUPRE: </label>
            <label>{aux1.nupre}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Valor Referencia: </label>
            <label>{aux1.valor_referencia}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Tipo Predio: </label>
            <label>{tipo_predio}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Condicion de Predio: </label>
            <label>{condicion}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Destinacion Economica: </label>
            <label>{destinacion_economica}</label>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Categoria Suelo: </label>
            <label>{categoria_suelo}</label>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Clase Suelo </label>
            <label>{clase_suelo}</label>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {mostrar(datos)}
    </Modal>
  );
});
export const InteresadoResumeForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    const closeModal = () => {
      setIsModalOpen(false);
    };
    useImperativeHandle(ref, () => ({
      openModal,
    }));
  };
  return <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>;
});
export const TerrenoResumeForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const datos = props.datos;
  const openModal = (aux) => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  const mostrar = (data) => {
    const aux = data;
    let aux1 = aux.terreno;
    console.log(aux1);
    return (
      <div className="w-full">
        <h2 className="text-3xl">Datos de Terreno</h2>
        <div className="w-full flex flex-row ">
          <div className=" w-1/3 flex flex-col mt-4">
            <label className="font-semibold">Area Terreno</label>
            <label>{aux1.area_terreno}</label>
          </div>
          <div className="w-1/3 flex flex-col mt-4 ml-4">
            <label className="font-semibold">Codigo Manzana</label>
            <label>{aux1.codigo_manzana}</label>
          </div>
          <div className="w-1/3 flex flex-col mt-4 ml-4">
            <label className="font-semibold">Avaluo Terreno</label>
            <label>{aux1.avaluo_terreno} </label>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {mostrar(datos)}
    </Modal>
  );
});
export const ConstruccionResumeForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const datos = props.datos;
  console.log("carga valores", datos);
  const openModal = (aux) => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  const mostrar = (data) => {
    const aux = data;
    let aux1 = aux.construccion;

    console.log(aux1);
    return aux1.map((item, index) => {
      let tipo_con = "";
      let tipo_dom = "";
      switch (item.tipo_construccion) {
        case "66":
          tipo_con = "Convencional";
          break;
        case "67":
          tipo_con = "No Convencional";
          break;
      }
      switch (item.tipo_dominio) {
        case "322":
          tipo_dom = "Común";
          break;
        case "323":
          tipo_dom = "Privado";
          break;
      }
      return (
        <div className="w-full">
          <h2 className="text-3xl">Datos de Construccion #{index + 1}</h2>
          <div className="w-full flex flex-row">
            <div className="w-1/2 flex flex-col">
              <label className="font-semibold">Tipo de Construccion</label>
              <label>{tipo_con}</label>
            </div>
            <div className="w-1/2 flex flex-col">
              {" "}
              <label className="font-semibold">Tipo de Dominio</label>
              <label>{tipo_dom}</label>
            </div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Numero Pisos</label>
              <label>{item.num_pisos}</label>
            </div>
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Numero de Semisotanos</label>
              <label>{item.num_semisotanos}</label>
            </div>
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Numero de Mezanines</label>
              <label>{item.num_mezanines}</label>
            </div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Año Construccion</label>
              <label>{item.anio_cons}</label>
            </div>
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Area Construccion</label>
              <label>{item.area}</label>
            </div>
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Avaluo Construccion</label>
              <label>{item.avaluo}</label>
            </div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Valor Referencia</label>
              <label>{item.valor_referencia}</label>
            </div>
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Altura</label>
              <label>{item.altura}</label>
            </div>
            <div className="w-1/3 flex flex-col">
              <label className="font-semibold">Observaciones</label>
              <label>{item.observacion}</label>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {mostrar(datos)}
    </Modal>
  );
});
export const UnidadConstruccionResumeForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const datos = props.datos;
  console.log("carga valores", datos);
  const openModal = (aux) => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  const mostrar = (data) => {
    const aux = data;
    let aux1 = aux.unidad_construccion;
    console.log("Data aux", aux1);
    return aux1.map((item, index) => {
      console.log(item);
      return (
        <div key={index} className="w-full">
          <h2 className="text-3xl">
            Datos de Unidad de Construccion #{index + 1}
          </h2>
          <div className="w-full flex flex-row ">
            <div className=" w-1/3 flex flex-col mt-4">
              <label className="font-semibold">Planta Ubicacion</label>
              <label>{item.planta_ubicacion}</label>
            </div>
            <div className="w-1/3 flex flex-col mt-4 ml-4">
              <label className="font-semibold">Altura</label>
              <label>{item.altura}</label>
            </div>
            <div className="w-1/3 flex flex-col mt-4 ml-4">
              <label className="font-semibold">Area Construida</label>
              <label>{item.area_construida} </label>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {" "}
      {mostrar(datos)}
    </Modal>
  );
});
