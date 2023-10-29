import { useState } from "react";

export let ResumenForm = () => {
  const [edit, setEdit] = useState(true);
  const [conve, setConve] = useState(true);
  const [objeto, setObjeto] = useState(true);
  const [valueobj, setValueobj] = useState();
  function generarEdit() {
    //Alternar Estados
    setEdit((prevEdit) => !prevEdit);
  }
  function conveSelect(e) {
    const aux = e.target.value;
    setConve(aux);
  }
  function unidadSelect(e) {
    setObjeto(false);
    setValueobj(e.target.value);
    if (e.target.value == "") {
      setObjeto(true);
    }
  }

  let EditForm = () => {
    return (
      <div className="w-full mb-2">
        <div id="Encabezados" className="flex flex-row w-full mt-4">
          <button className="pt-2  w-1/4 text-center      text-white bg-teal-500 ">
            Estructura
          </button>{" "}
          <button className="w-1/4 text-center      text-white bg-teal-500 ">
            Acabados Principales
          </button>{" "}
          <button className="w-1/4 text-center     text-white bg-teal-500 ">
            Baño
          </button>{" "}
          <button className="p-2 w-1/4 text-center      text-white bg-teal-500 ">
            Cocina
          </button>
        </div>
        <div id="Espacios" className="flex flex-row w-full mt-4">
          <div className="w-1/4 text-center">
            <h1>Armazon</h1>
            <select className="p-1 w-full text-center border-2 rounded-md overflow-auto">
              <option>Madera</option>
              <option>Prefabricado</option>
              <option>Ladrillo, Bloque</option>
              <option>Concreto Hasta 3 Piso</option>
              <option> Concreto Cuatro o mas Pisos</option>
            </select>
          </div>
          <div className="w-1/4 text-center">
            <h1>Muros</h1>
            <select className="p-1 w-full text-center border-2 rounded-md overflow-auto">
              <option>Esterilla</option>
              <option>Baharreque,Adobe, Tapia</option>
              <option>Madera</option>
              <option>Concreto Prefabricado</option>
              <option>Ladrillo, Bloque</option>
            </select>
          </div>
          <div className="w-1/4 text-center">
            <h1>Cubierta</h1>
            <select className="p-1 w-full text-center border-2 rounded-md overflow-auto">
              <option>Materiales de deseño,Telas Asfalticas</option>
              <option>Zing, Teja de Barro, Eternit Rustico</option>
              <option>EntrePiso Prefabricado</option>
              <option>Eternit o Teja de Barro</option>
              <option>Azotea, Aluminio</option>
              <option>Placa Imperbeabilizada</option>
            </select>
          </div>
          <div className="w-1/4 text-center">
            <h1>Conservacion</h1>
            <select className="p-1 w-full text-center border-2 rounded-md overflow-auto">
              <option>Malo</option>
              <option>Regular</option>
              <option>Bueno</option>
              <option>Excelente</option>
              <option> Concreto Cuatro o mas Pisos</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  let PrincipalForm = () => {
    return (
      <div className="w-full mb-2">
        <div id="Encabezados" className="flex flex-row w-full mt-4">
          <button className="pt-2  w-1/4 text-center      text-white bg-teal-500 ">
            Estructura
          </button>{" "}
          <button className="w-1/4 text-center      text-white bg-teal-500 ">
            Acabados Principales
          </button>{" "}
          <button className="w-1/4 text-center     text-white bg-teal-500 ">
            Baño
          </button>{" "}
          <button className="p-2 w-1/4 text-center      text-white bg-teal-500 ">
            Cocina
          </button>
        </div>
        <div id="Espacios" className="flex flex-row w-full mt-4">
          <div className="w-1/4 text-center">
            <h1 className="text-2xl font-semibold">Armazon</h1>
            <label className="p-1 w-full text-center text-2xl   overflow-auto">
              Madera
            </label>
          </div>
          <div className="w-1/4 text-center">
            <h1 className="text-2xl font-semibold">Muros</h1>
            <label className="p-1 w-full text-center text-2xl   overflow-auto">
              Esterilla
            </label>
          </div>
          <div className="w-1/4 text-center">
            <h1 className="text-2xl font-semibold">Cubierta</h1>
            <label className="p-1 w-full text-center text-2xl   overflow-auto">
              Materiales de deseño,Telas Asfalticas
            </label>
          </div>
          <div className="w-1/4 text-center">
            <h1 className="text-2xl font-semibold">Conservacion</h1>
            <label className="p-1 w-full text-center text-2xl   overflow-auto">
              Malo
            </label>
          </div>
        </div>
      </div>
    );
  };
  let ConveForm = () => {
    return (
      <div
        id="der"
        className="w-1/2 bg-white bg-opacity-20 items-center shadow-lg rounded-lg text-center  border-2 p-4 justify-center"
      >
        <h1 className="text-3xl">Puntaje : 81</h1>
        <h2 className="text-2xl">Clasificacion Grupos</h2>
        <div className="w-full text-left flex flex-row items-center">
          <h2 className="text-2xl font-semibold w-3/5">Numero Pisos:</h2>
          <h2 className="text-2xl  w-2/5 text-center">3</h2>
        </div>{" "}
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5 ">
            Numero Habitaciones:
          </h2>
          <h2 className="text-2xl  w-2/5 text-center">5</h2>
        </div>{" "}
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5">Numero Baños:</h2>
          <h2 className="text-2xl  w-2/5 text-center">1</h2>
        </div>{" "}
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5">Numero Locales:</h2>
          <h2 className="text-2xl  w-2/5 text-center">0</h2>
        </div>{" "}
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5">Año Construcción:</h2>
          <h2 className="text-2xl  w-2/5  text-center">3</h2>
        </div>{" "}
        <div className="w-full text-left flex flex-row  items-center ">
          <h2 className="text-2xl font-semibold w-3/5  items-center">
            Observación:
          </h2>
          <h2 className="text-2xl  w-2/5 text-center items-center ">
            Ordenado y Limpio
          </h2>
        </div>{" "}
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl  font-semibold w-3/5 items-center">
            Tipo Planta
          </h2>
          <h2 className="text-2xl  w-2/5 text-center">Piso</h2>
        </div>{" "}
        <div className="w-full text-left flex flex-row items-center">
          <h2 className="text-2xl font-semibold w-3/5">
            Tipo Unidad Construccion:
          </h2>
          <h2 className="text-2xl   w-2/5 text-center ">Residencial</h2>
        </div>{" "}
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5">Uso:</h2>
          <h2 className="text-2xl  w-2/5 text-center">Casa Elbas</h2>
        </div>{" "}
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5">Destinacion</h2>
          <h2 className="text-2xl  w-2/5 text-center">Residencial</h2>
        </div>
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5">Estructura</h2>
          <h2 className="text-2xl w-2/5 text-center">Subtotal: 11</h2>
        </div>
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5">Acabados</h2>
          <h2 className="text-2xl w-2/5 text-center">Subtotal: 30</h2>
        </div>
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5">Baños</h2>
          <h2 className="text-2xl w-2/5 text-center">Subtotal: 20</h2>
        </div>
        <div className="w-full text-left flex flex-row">
          <h2 className="text-2xl font-semibold w-3/5">Cocina</h2>
          <h2 className="text-2xl w-2/5 text-center">Subtotal: 20</h2>
        </div>
      </div>
    );
  };
  let UnForm = () => {
    return (
      <div>
        <p className="text-2xl mb-2">
          Escoge la Caracteristicas de Construcción
        </p>
        <select
          className="w-3/4 p-1  text-center border-2 rounded-md"
          onChange={unidadSelect}
          value={valueobj}
        >
          <option></option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <p className="text-2xl mb-2 font-semibold">
          Caracteristicas de Contruccion: {valueobj}
        </p>
        <p className="text-2xl mb-2 font-semibold">
          Destino Economico : Residencial
        </p>
      </div>
    );
  };
  let DownForm = () => {
    return (
      <div id="Abajo" className="flex flex-col w-full ">
        {edit ? <PrincipalForm /> : <EditForm />}
        <div id="Botones" className="mt-10 w-full flex flex-row justify-end">
          <button
            className="p-2 w-1/4 text-center   rounded-md  border-2  text-white bg-teal-500 "
            onClick={generarEdit}
          >
            Editar
          </button>
          <button className="p-2 w-1/4 text-center   rounded-md  border-2  text-white bg-teal-500 ">
            Guardar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 w-4/5 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-center ">
      <div id="Arriba" className="flex flex-row w-full ">
        <div id="izq" className="w-1/2 p-4 flex flex-col justify-center ">
          <h1 className="text-3xl mb-2 font-semibold">Resumen</h1>
          <p className="text-2xl mb-2"> Escoge Tipo de Construccion </p>
          <select
            className="w-3/4 p-1  text-center border-2 rounded-md"
            onChange={conveSelect}
          >
            <option></option>
            <option>Convencional</option>
            <option>No Convencional</option>
          </select>
          {conve == "Convencional" && <UnForm />}
        </div>
        {conve == "Convencional" && !objeto && <ConveForm />}
      </div>
      {conve == "Convencional" && !objeto && <DownForm />}
    </div>
  );
};
