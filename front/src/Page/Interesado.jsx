import { Modal } from "./Modal";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { InteresadoContext } from "./Context/InteresadoContext";
import { TableContext } from "./Context/Context";

const InteresadoForm = (props, ref) => {
  //const [groupInterest, setGroupInterest] = useState(false);  const { updateInteresadoData, updateDataFinal } =useContext(InteresadoContext);
  const { tableData, updateTableData } = useContext(TableContext);
  const [estBtt, setEstBtt] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let [dataId, setDataId] = useState();

  const openModal = (aux) => {
    setDataId(aux);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));

  //Se Aceptan solo  Numeros
  function soloNumeros(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.,]/g, "");
  }
  //Se Aceptan solo Letras
  function soloLetras(event) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z]/g, ""); // Elimina caracteres no alfabéticos
  }

  const [numInteresados, setNumInteresados] = useState();
  const [interesados, setInteresados] = useState([]);
  const [interesadosData, setInteresadosData] = useState();

  const Load_Num = (e) => {
    const newValue = parseInt(e.target.value);
    setNumInteresados(newValue);
    const newInteresadosData = Array.from({ length: newValue }, () => ({
      tipo: 659,
      tipo_documento: 0,
      documento_identidad: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      sexo: 0,
      grupo_etnico: 0,
      razon_social: "",
      estado_civil: 0,
      nombre: "",
      comienzo_vida_util_version: "",
      fin_vida_util_version: "",
      espacio_de_nombres: "Fusagasuga",
      local_id: "",
    }));
    setInteresadosData(newInteresadosData);
  };
  //Form de Interesados
  const agregarInteresados = () => {
    const nuevosInteresados = [];
    for (let i = 0; i < numInteresados; i++) {
      nuevosInteresados.push(
        <ValidarInteresado
          key={i}
          index={i}
          onDataChange={actualizarDatosInteresado}
        />
      );
    }
    setInteresados(nuevosInteresados);
  };
  const actualizarDatosInteresado = (index, newData) => {
    // Aquí puedes manejar los datos del Interesado individualmente
    setInteresadosData((prevData) => {
      const newDataArray = [...prevData];
      newDataArray[index] = newData;
      return newDataArray;
    });
  };

  useEffect(() => {
    console.log("datos Array Completo actualizado", interesadosData);
  }, [interesadosData]);

  //Formulario
  const ValidarInteresado = (index, onDataChange) => {
    const [dataInteresado, setDataInteresado] = useState({
      tipo: 0,
      tipo_documento: 0,
      documento_identidad: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      sexo: 0,
      grupo_etnico: 0,
      razon_social: "",
      estado_civil: 0,
      nombre: "",
      comienzo_vida_util_version: "",
      fin_vida_util_version: "",
      espacio_de_nombres: "Fusagasuga",
      local_id: "",
    });
    const [stateInput, setStateInput] = useState();
    const [dataState, setDataState] = useState();
    const [dataResult, setDataResult] = useState(null);
    const [msjResult, setMsjResult] = useState();
    const Load_Data = (e) => {
      const { name, value } = e.target;
      setDataInteresado((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Notificar cambios al componente principal
    };

    const InteresadoConfirm = async () => {
      const url =
        import.meta.env.VITE_API_URL_FIRST +
        "interesados/" +
        dataInteresado.documento_identidad;
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          const result = await response.json();
          console.log("Resultado", result.data.interesado);
          setDataState(true);
          setStateInput(true);
          setDataResult(result.data.interesado);
          if (
            result.data.interesado &&
            result.data.interesado.interesado_lc_interesado
          ) {
            setDataInteresado(result.data.interesado.interesado_lc_interesado);
          } else {
            setDataInteresado(result.data.interesado);
          }

          setMsjResult(result.message);
        } else {
          const error = await response.json();
          setDataState(false);
          setStateInput(false);
          console.log("Error en la solicitud:", error);
          setMsjResult(error.message);
        }
      } catch (error) {
        setDataState(false);
        setStateInput(false);
        console.log("Error en la solicitud:", error);
        setMsjResult(error.message);
      }
    };

    const NoEditForm = () => {
      return (
        <div className="w-full flex flex-col">
          {dataInteresado.tipo != 659 ? (
            <div className="w-full flex flex-row">
              <div className="w-1/4">
                <label className="font-semibold">Primer Nombre*:</label>
                <input
                  name="primer_nombre"
                  type="text"
                  className="border-2 p-1 rounded-md w-full"
                  disabled={stateInput}
                  onChange={Load_Data}
                  onInput={soloLetras}
                  value={dataInteresado.primer_nombre}
                ></input>
              </div>
              <div className="w-1/4 ml-4">
                <label className="font-semibold">Segundo Nombre*:</label>
                <input
                  name="segundo_nombre"
                  onChange={Load_Data}
                  disabled={stateInput}
                  onInput={soloLetras}
                  type="text"
                  className="border-2 p-1 rounded-md w-full"
                  value={dataInteresado.segundo_nombre}
                ></input>
              </div>
              <div className="w-1/4 ml-4">
                <label className="font-semibold">Primer Apellido*:</label>
                <input
                  name="primer_apellido"
                  type="text"
                  className="border-2 p-1 rounded-md w-full"
                  onChange={Load_Data}
                  onInput={soloLetras}
                  disabled={stateInput}
                  value={dataInteresado.primer_apellido}
                ></input>
              </div>
              <div className="w-1/4 ml-4">
                <label className="font-semibold">Segundo Apellido:</label>
                <input
                  name="segundo_apellido"
                  type="text"
                  className="border-2 p-1 rounded-md w-full"
                  onChange={Load_Data}
                  onInput={soloLetras}
                  disabled={stateInput}
                  value={dataInteresado.segundo_apellido}
                ></input>
              </div>
            </div>
          ) : null}
          <div className="w-full flex flex-row">
            <div className="w-1/4 ">
              <label className="font-semibold">Tipo de Documento*:</label>
              <select
                type="text"
                name="tipo_documento"
                className="border-2 p-1 rounded-md w-full"
                onChange={Load_Data}
                disabled={stateInput}
                value={dataInteresado.tipo_documento}
              >
                <option></option>
                <option value={529}>Cedula de Ciudadania</option>
                <option value={530}>Cedula de Extranjeria</option>
                <option value={531}>NIT</option>
                <option value={532}>Tarjeta Identidad</option>
                <option value={533}>Registro Civil</option>
                <option value={534}>Secuencial</option>
                <option value={535}>Pasaporte</option>
              </select>
            </div>
            <div className="w-1/4 ml-4">
              <label className="font-semibold">Numero de Documento*:</label>
              <input
                name="documento_identidad"
                type="text"
                className="border-2 p-1 rounded-md w-full"
                minLength={8}
                onChange={Load_Data}
                disabled={stateInput}
                onInput={soloNumeros}
                value={dataInteresado.documento_identidad}
              ></input>
            </div>
            {dataInteresado.tipo != 659 ? (
              <div className="w-1/4 ml-4">
                <label className="font-semibold">Estado Civil*:</label>
                <select
                  type="text"
                  name="estado_civil"
                  className="border-2 p-1 rounded-md w-full"
                  onChange={Load_Data}
                  disabled={stateInput}
                  value={dataInteresado.estado_civil}
                >
                  <option></option>
                  <option value={812}>
                    No Casado/a vive en pareja menos 2 años
                  </option>
                  <option value={813}>
                    No Casado/a vive en pareja 2 años o mas
                  </option>
                  <option value={814}>Casado/a</option>
                  <option value={815}>Separado/a - Divorciado/a</option>
                  <option value={816}>Viudo/a</option>
                  <option value={817}>Soltero/a</option>
                </select>
              </div>
            ) : null}
            {dataInteresado.tipo != 659 ? (
              <div className="w-1/4 ml-4">
                <label className="font-semibold">Grupo Etnico*:</label>
                <select
                  type="text"
                  name="grupo_etnico"
                  className="border-2 p-1 rounded-md w-full"
                  onChange={Load_Data}
                  value={dataInteresado.grupo_etnico}
                >
                  <option></option>
                  <option value={866}>Indigena</option>
                  <option value={867}>Rrom</option>
                  <option value={868}>Raizal</option>
                  <option value={869}>Palenquero</option>
                  <option value={870}>Negro Afrocolombiano</option>
                  <option value={871}>Ninguno</option>
                </select>
              </div>
            ) : null}
          </div>
          <div className="w-full flex flex-row">
            {dataInteresado.tipo != 659 ? (
              <div className="w-1/4">
                <label className="font-semibold">Genero*:</label>
                <select
                  name="sexo"
                  type="text"
                  disabled={stateInput}
                  className="border-2 p-1 rounded-md w-full"
                  onChange={Load_Data}
                  value={dataInteresado.sexo}
                >
                  <option></option>
                  <option value={737}> Masculino</option>
                  <option value={737}> Femenino</option>
                  <option value={739}> Sin Determinar</option>
                </select>
              </div>
            ) : null}
            <div className="w-2/4 ml-4">
              <label className="font-semibold">Nombre*:</label>
              <input
                name="nombre"
                type="text"
                disabled
                className="border-2 p-1 rounded-md w-full"
                onChange={Load_Data}
                value={
                  dataInteresado.tipo != 659
                    ? dataInteresado.primer_apellido +
                      " " +
                      dataInteresado.segundo_apellido +
                      " " +
                      dataInteresado.primer_nombre +
                      " " +
                      dataInteresado.segundo_nombre
                    : dataInteresado.razon_social
                }
              ></input>
            </div>
            {dataInteresado.tipo == 659 ? (
              <div className="w-1/4 ml-4">
                <label className="font-semibold">Razon Social*:</label>
                <input
                  name="razon_social"
                  type="text"
                  disabled={stateInput}
                  value={dataInteresado.razon_social}
                  className="border-2 p-1 rounded-md w-full"
                  onChange={Load_Data}
                ></input>
              </div>
            ) : null}
          </div>
        </div>
      );
    };

    useEffect(() => {
      index.onDataChange(index.index, dataInteresado);
      console.log("Actualizacion datos", dataInteresado);
    }, [dataInteresado]);

    return (
      <div>
        <div className="m-2 font-semibold flex flex-col">
          <div className="m-2 font-semibold flex flex-row">
            <label className="text-2xl">
              Validar Interesado #{index.index + 1}
            </label>
          </div>
          <div className="m-2 font-semibold flex flex-row">
            <div className="w-2/5 flex flex-col ml-2">
              <label>Numero de Documento</label>
              <input
                name="documento_identidad"
                type="text"
                className="border-2 p-1 rounded-md w-full"
                onChange={Load_Data}
                onInput={soloNumeros}
                value={dataInteresado.documento_identidad}
              ></input>
            </div>
            <div className="w-1/5 flex flex-col justify-center">
              <button
                onClick={InteresadoConfirm}
                className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-4"
              >
                Validar
              </button>
            </div>
          </div>
        </div>
        <div>
          {dataState ? (
            <NoEditForm data={dataInteresado} />
          ) : (
            <div>{msjResult}</div>
          )}
        </div>
      </div>
    );
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start ">
        <h1 className="text-2xl">Datos Generales del Interesado</h1>
        <div className="w-full pt-4 flex flex-row text-left">
          <input
            type="number"
            placeholder="Número de interesados"
            className="border-2 p-1 rounded-md w-full"
            value={numInteresados}
            onChange={Load_Num}
            onInput={soloNumeros}
          />
          <button
            className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-4"
            onClick={agregarInteresados}
          >
            Agregar Interesados
          </button>
        </div>
        <div className="w-full">{interesados}</div>
        <div className="w-full">
          <button>Guardar</button>
        </div>
      </div>
    </Modal>
  );
};
export default forwardRef(InteresadoForm);
