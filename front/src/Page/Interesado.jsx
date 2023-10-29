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
  //const [groupInterest, setGroupInterest] = useState(false);

  const { tableData, updateTableData } = useContext(TableContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateInteresadoData, updateDataFinal } =
    useContext(InteresadoContext);
  const [isChecked, setIsChecked] = useState(false);

  const [dataInteresado, setDataInteresado] = useState({
    tipo: 0,
  });

  //const [estForm, setEstForm] = useState(0);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  let [dataId, setDataId] = useState({
    first: "",
    second: "",
  });
  const openModal = (aux) => {
    aux.first = parseInt(aux.first);
    aux.second = parseInt(aux.second);
    setDataId(aux);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));

  function Load_Data(e) {
    const { name, value } = e.target;
    setDataInteresado((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

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
  const PersonNaturalForm = () => {
    const [dataInteresado, setDataInteresado] = useState({
      tipo: 658,
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
    const updateNom = () => {
      const {
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
      } = dataInteresado;
      const nombreCompleto = `${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`;
      setDataInteresado({ ...dataInteresado, nombre: nombreCompleto });
    };
    useEffect(() => {
      updateNom();
    }, [
      dataInteresado.primer_nombre,
      dataInteresado.segundo_nombre,
      dataInteresado.primer_apellido,
      dataInteresado.segundo_apellido,
    ]);
    function SendData() {
      updateInteresadoData((prevValues) => ({
        ...prevValues,
        interesado_lc_interesado: dataInteresado,
      }));
      updateDataFinal();
    }
    function Load_Data(e) {
      const { name, value } = e.target;
      console.log("nombre", name);
      console.log("Valor", value);
      setDataInteresado((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    return (
      <div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Primer Nombre*:</label>
            <input
              name="primer_nombre"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              onInput={soloLetras}
              value={dataInteresado.primer_nombre}
            ></input>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Segundo Nombre*:</label>
            <input
              name="segundo_nombre"
              onChange={Load_Data}
              onInput={soloLetras}
              type="text"
              className="border-2 p-1 rounded-md w-full"
              value={dataInteresado.segundo_nombre}
            ></input>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Primer Apellido*:</label>
            <input
              name="primer_apellido"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              onInput={soloLetras}
              value={dataInteresado.primer_apellido}
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Segundo Apellido:</label>
            <input
              name="segundo_apellido"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              onInput={soloLetras}
              value={dataInteresado.segundo_apellido}
            ></input>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Tipo de Documento*:</label>
            <select
              type="text"
              name="tipo_documento"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
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
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Numero de Documento*:</label>
            <input
              name="documento_identidad"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              minLength={8}
              onChange={Load_Data}
              onInput={soloNumeros}
              value={dataInteresado.documento_identidad}
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Estado Civil*:</label>
            <select
              type="text"
              name="estado_civil"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
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
          <div className="w-1/3 ml-4">
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
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Genero*:</label>
            <select
              name="sexo"
              type="text"
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
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Nombre*:</label>
            <input
              name="nombre"
              type="text"
              disabled
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              value={
                dataInteresado.primer_apellido +
                " " +
                dataInteresado.segundo_apellido +
                " " +
                dataInteresado.primer_nombre +
                " " +
                dataInteresado.segundo_nombre
              }
            ></input>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="w-1/3 flex flex-col items-center">
            <button
              className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-4"
              onClick={SendData}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    );
  };
  const PersonJuridicForm = () => {
    const [dataInteresado, setDataInteresado] = useState({
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
    });

    function SendData() {
      let newData = {
        interesado_lc_interesado: dataInteresado,
      };
      updateInteresadoData(newData, 1);

      tableData.map((item, index) => {
        if (index >= dataId.first - 1 && index <= dataId.second - 1) {
          item.interesado = dataInteresado;
          console.log(item);
        }
      });
      updateTableData(tableData);
    }
    function Load_Data(e) {
      const { name, value } = e.target;
      setDataInteresado((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    const updateNom = () => {
      const { razon_social } = dataInteresado;
      setDataInteresado({ ...dataInteresado, nombre: razon_social });
    };
    useEffect(() => {
      updateNom();
    }, [dataInteresado.razon_social]);
    return (
      <div>
        <div className="flex flex-row w-full">
          <div className="w-1/3">
            <label className="font-semibold">Tipo de Documento*:</label>
            <select
              type="text"
              name="tipo_documento"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
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
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Numero de Documento*:</label>
            <input
              name="documento_identidad"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              minLength={8}
              value={dataInteresado.documento_identidad}
              onChange={Load_Data}
              onInput={soloNumeros}
            ></input>
          </div>
          <div className="w-1/3 ml-4"></div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3">
            <label className="font-semibold">Razon Social*:</label>
            <input
              name="razon_social"
              type="text"
              value={dataInteresado.razon_social}
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
            ></input>
          </div>
          <div className="w-1/3 ml-4">
            <label className="font-semibold">Nombre*:</label>
            <input
              name="nombre"
              type="text"
              value={dataInteresado.nombre}
              disabled
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3 flex flex-col items-center">
            <button
              className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-4"
              onClick={SendData}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    );
  };
  const GroupInterestForm = () => {
    const { updateInteresadoData } = useContext(InteresadoContext);
    const [parti, setParti] = useState("");
    const [bttgroup, setBttGroup] = useState(true);
    const [agrupData, setAgrupData] = useState({
      tipo: "",
      nombre: "",
      comienzo_vida_util_version: "",
      fin_vida_util_version: null,
      espacio_de_nombres: "Fusagasuga",
      local_id: "",
    });
    function Load_Agrup(e) {
      const { name, value } = e.target;
      setAgrupData((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
      if (parti !== "" && agrupData.tipo !== "") {
        setBttGroup(false);
      } else {
        setBttGroup(true);
      }
    }

    function Load_Participacion(e) {
      let { value } = e.target;
      setParti(value);
      if (parti !== "" && agrupData.tipo !== "") {
        setBttGroup(false);
      } else {
        setBttGroup(true);
      }
    }
    function sendAgrupacion() {
      updateInteresadoData((prevValues) => ({
        ...prevValues,
        interesado_lc_agrupacioninteresados: agrupData,
        participacion: parti,
      }));
    }

    return (
      <div className="w-full  flex flex-row">
        <div className="w-1/3 ">
          <label className="font-semibold">Tipo de Agrupacion* :</label>
          <select
            name="tipo"
            className="border-2 p-1 rounded-md w-full"
            onChange={Load_Agrup}
            value={agrupData.tipo}
          >
            <option></option>
            <option value={34}>Grupo Civil</option>
            <option value={35}>Grupo Empresarial</option>
            <option value={36}>Grupo Etnico</option>
            <option value={37}>Grupo Mixto</option>
          </select>
        </div>
        <div className="w-1/3 flex flex-col ml-4">
          <label className="font-semibold">Porcentaje Participacion* :</label>
          <input
            type="text"
            className="border-2 p-1 rounded-md w-full"
            onChange={Load_Participacion}
            value={parti}
            onInput={soloNumeros}
          ></input>
        </div>
        <div className="w-1/3 ml-4 flex flex-col">
          <label className="font-semibold text-white">jasdhjaksd </label>
          <button
            className={`${
              bttgroup ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }
           p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2
           `}
            onClick={sendAgrupacion}
            disabled={bttgroup}
          >
            Cargar Agrupacion
          </button>
        </div>
      </div>
    );
  };
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
    console.log("datos sss", nuevosInteresados);
    console.log("datos Interesados", interesadosData);
    setInteresados(nuevosInteresados);
  };
  const actualizarDatosInteresado = (index, newData) => {
    // Aquí puedes manejar los datos del Interesado individualmente
    console.log(`Datos del Interesado ${index + 1}:`, newData);
    setInteresadosData((prevData) => {
      const newDataArray = [...prevData];
      console.log("asdasdasdasd", newDataArray);
      console.log("Inedx", index);
      newDataArray[index] = newData;
      console.log("as222", newDataArray);
      return newDataArray;
    });
    //console.log("datos Array Completo", interesadosData);
  };
  useEffect(() => {
    console.log("datos Array Completo actualizado", interesadosData);
  }, [interesadosData]);

  const ValidarInteresado = (index, onDataChange) => {
    const [dataInteresado, setDataInteresado] = useState({
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
    });
    const Load_Data = (e) => {
      const { name, value } = e.target;
      setDataInteresado((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Notificar cambios al componente principal
    };
    useEffect(() => {
      index.onDataChange(index.index, dataInteresado);
    }, [dataInteresado]);
    return (
      <div>
        <h2>Interesado #{index.index + 1}</h2>
        <div className="m-2 font-semibold flex flex-col">
          <label>Validar Interesado</label>
          <label>Tipo de Documento</label>
          <select
            type="text"
            name="tipo_documento"
            className="border-2 p-1 rounded-md w-full"
            onChange={Load_Data}
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
          <div className="w-full flex flex-row mt-2">
            <label>Numero de Documento</label>
            <input
              name="documento_identidad"
              type="text"
              className="border-2 p-1 rounded-md w-full"
              onChange={Load_Data}
              value={dataInteresado.documento_identidad}
            ></input>
            <button className=" p-1 text-center rounded-md text-white bg-teal-500 text-lg ml-4">
              Validar
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
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
      </div>
    </Modal>
  );
};
export default forwardRef(InteresadoForm);
/*
<div className="w-full pt-4 flex flex-col text-left">
  <div className="m-2 font-semibold">
    <input
      type="checkbox"
      value="Grupo de Interesados ?"
      checked={isChecked}
      onChange={handleOnChange}
    ></input>
    <label> Grupo de Interesados ?</label>
  </div>
  {isChecked ? <GroupInterestForm /> : null}

  <div className="w-full flex flex-col">
    <div className="w-full flex flex-row">
      <div className="w-1/3 flex flex-col">
        <label className="font-semibold">Tipo Interesado*:</label>
        <select
          name="tipo"
          type="text"
          className="border-2 p-1 rounded-md w-full"
          onChange={Load_Data}
        >
          <option></option>
          <option value={658}>Persona Natural</option>
          <option value={659}>Persona Juridica</option>
        </select>
      </div>
    </div>
  </div>
  {dataInteresado.tipo === "658" ? <PersonNaturalForm /> : null}
  {dataInteresado.tipo === "659" ? <PersonJuridicForm /> : null}
</div>
;
 */
