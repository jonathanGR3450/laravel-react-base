import { Modal } from "./Modal";
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { DataContext } from "./Context/DataContext";
import { TableContext } from "./Context/Context";
const PredioForm = (props, ref) => {
  console.log("Props", props);
  let tableData = [];
  let updateTableData = () => {};
  const {
    tableData: contextTableData,
    updateTableData: contextUpdateTableData,
  } = useContext(TableContext);
  const [estBtt, setEstBtt] = useState(true);
  const [codFMI, setCodFMI] = useState(false);
  const [dataForm, setDataForm] = useState({
    t_id: "",
    departamento: "25",
    municipio: "290",
    id_operacion: "",
    tiene_fmi: false,
    codigo_orip: null,
    matricula_inmobiliaria: null,
    numero_predial: "",
    numero_predial_anterior: "",
    codigo_homologado: "",
    interrelacionado: false,
    codigo_homologado_fmi: false,
    nupre: null,
    avaluo_catastral: 0,
    valor_referencia: 0,
    tipo: 0,
    condicion_predio: 0,
    destinacion_economica: 0,
    clase_suelo: 0,
    categoria_suelo: null,
    nombre: null,
    comienzo_vida_util_version: "2022-05-20 01:23:26.006883",
    fin_vida_util_version: null,
    espacio_de_nombres: "Fusagasuga",
    local_id: "BAF0006WHJF",
  });
  function Load_Data(e) {
    let { name, value } = e.target;
    if (e.target.type == "checkbox") {
      console.log("valor", e.target.checked);
      if (e.target.checked) {
        value = true;
      } else {
        value = false;
      }
    }
    setDataForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const sendData = async () => {
    if (props.contexto) {
      let dataId = props.dataid;
      console.log(dataId);
      tableData = contextTableData;
      updateTableData = contextUpdateTableData;
      for (const [index, item] of tableData.entries()) {
        console.log("Tamaño 121212 ", item);
        for (const items of dataId) {
          if (items - 1 === index) {
            dataForm.matricula_inmobiliaria = item.Matricula;
            dataForm.codigo_homologado = item.codigo_homologado;
            dataForm.local_id = item.codigo_homologado;
            dataForm.numero_predial =
              item.Dpto +
              item.Mpio +
              item.Zona +
              item.Sector +
              item.Comuna +
              item.Barrio +
              item.Manzana +
              item.Terreno +
              item.Condicion +
              item.Edificio +
              item.Piso +
              item.Unidad;
            dataForm.id_operacion = dataForm.numero_predial;
            if (dataForm.interrelacionado) {
              dataForm.nupre = item.codigo_homologado;
            }
            let json = {
              departamento: dataForm.departamento,
              municipio: dataForm.municipio,
              id_operacion: dataForm.id_operacion,
              tiene_fmi: dataForm.tiene_fmi,
              codigo_orip: dataForm.codigo_orip,
              matricula_inmobiliaria: dataForm.matricula_inmobiliaria,
              numero_predial: dataForm.numero_predial,
              numero_predial_anterior: "0",
              codigo_homologado: dataForm.codigo_homologado,
              interrelacionado: dataForm.interrelacionado,
              codigo_homologado_fmi: false,
              nupre: dataForm.nupre,
              avaluo_catastral: dataForm.avaluo_catastral,
              valor_referencia: dataForm.valor_referencia,
              tipo: dataForm.tipo,
              condicion_predio: dataForm.condicion_predio,
              destinacion_economica: dataForm.destinacion_economica,
              clase_suelo: dataForm.clase_suelo,
              categoria_suelo: dataForm.categoria_suelo,
              nombre: null,
              comienzo_vida_util_version: "",
              fin_vida_util_version: null,
              espacio_de_nombres: "Fusagasuga",
              local_id: item.codigo_homologado,
            };

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let url = import.meta.env.VITE_API_URL_FIRST + "predio";
            let raw = JSON.stringify(json);
            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };
            console.log("url PREDIO", raw);
            try {
              const response = await fetch(url, requestOptions);
              const result = await response.json();
              dataForm.t_id = result.data.t_id;
              item.predio = dataForm;
              console.log(result);
            } catch (error) {
              console.log("error", error);
            }
          }
        }
      }
    }
    console.log("Datos Form predio", dataForm);
    console.log("datos de tabla", tableData);
    updateTableData(tableData);
  };

  const handleOnChange = () => {
    setCodFMI(!codFMI);
  };
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <h1 className="text-3xl">Caracteristicas del predio</h1>
      <p>A continuación se muestran las caracteristicas del predio</p>
      <div className="w-full">
        <h2 className="text-2xl">Datos Generales del Predio</h2>
        <div className="w-full flex flex-row">
          <div className="w-1/3 flex flex-row ml-4 items-center ">
            <input
              name="tiene_fmi"
              type="checkbox"
              onChange={Load_Data}
            ></input>
            <label className="ml-4">Tiene FMI ?</label>
          </div>
          <div className="w-1/3 flex flex-col">
            <label className="font-semibold">Codigo ORIP* :</label>
            <input
              onChange={Load_Data}
              name="codigo_orip"
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3 flex flex-row ml-4 items-center ">
            <input
              type="checkbox"
              name="interrelacionado"
              onChange={Load_Data}
            ></input>
            <label className="ml-4">Interrelacionado ?</label>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3 flex flex-row  items-center justify-center">
            <input
              type="checkbox"
              name="codigo_homologado_fmi"
              checked={codFMI}
              onChange={handleOnChange}
            ></input>
            <label className="p-4"> Codigo Homologado FMI ?</label>
          </div>
          {codFMI ? (
            <div className="w-1/3 flex flex-col ml-4">
              <label className="font-semibold">NUPRE* :</label>
              <input
                name="nupre"
                type="text"
                disabled
                className="border-2 p-1 rounded-md w-full"
                value={dataForm.codigo_homologado}
              ></input>
            </div>
          ) : null}
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3 flex flex-col">
            <label className="font-semibold">Avaluo Catastral :</label>
            <input
              onChange={Load_Data}
              name="avaluo_catastral"
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3 flex flex-col ml-4">
            <label className="font-semibold">Valor Referencia* :</label>
            <input
              onChange={Load_Data}
              name="valor_referencia"
              type="text"
              className="border-2 p-1 rounded-md w-full"
            ></input>
          </div>
          <div className="w-1/3 flex flex-col ml-4">
            <label className="font-semibold">Tipo de Predio* :</label>
            <select
              onChange={Load_Data}
              name="tipo"
              className="border-2 p-1 rounded-md w-full"
            >
              <option></option>
              <option value="888">(Predio) (Público) Baldío</option>
              <option value="889">(Predio) (Público) Fiscal</option>
              <option value="890">(Predio) (Público) Patrimonial</option>
              <option value="891">(Predio) (Público) Uso público</option>
              <option value="892">(Predio) (Público) Ejido</option>
              <option value="893">(Predio) Privado</option>
              <option value="894">(Predio) Territorio colectivo</option>
              <option value="895">(Predio) Vacante</option>
              <option value="896">Ordenamiento territorial</option>
              <option value="897">Servicios públicos</option>
              <option value="898">Reservas naturales</option>
              <option value="899">Parques naturales</option>
              <option value="900">Amenazas de riesgos</option>
              <option value="901">Servidumbre</option>
              <option value="902">Superficies de agua</option>
              <option value="903">Transporte</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3 flex flex-col ">
            <label className="font-semibold">Condicion Predio* :</label>
            <select
              onChange={Load_Data}
              name="condicion_predio"
              className="border-2 p-1 rounded-md w-full"
            >
              <option></option>
              <option value="442">No propiedad horizontal</option>
              <option value="443">(Propiedad horizontal) Matriz</option>
              <option value="444">(Propiedad horizontal) Unidad Predial</option>
              <option value="445">(Condominio) Matriz</option>
              <option value="446">(Condominio) Unidad predial</option>
              <option value="447">(Parque cementerio) Matriz</option>
              <option value="448">(Parque Cementerio) Unidad predial</option>
              <option value="449">Vía</option>
              <option value="450">Informal</option>
              <option value="451">Bien de uso público</option>
              <option value="903">Mejora</option>
            </select>
          </div>
          <div className="w-1/3 flex flex-col ml-4">
            <label className="font-semibold">Destinacion Economica* :</label>
            <select
              onChange={Load_Data}
              name="destinacion_economica"
              className="border-2 p-1 rounded-md w-full"
            >
              <option></option>
              <option value="162">Acuícola</option>
              <option value="163">Agrícola</option>
              <option value="164">Agroindustrial</option>
              <option value="165">Agropecuario</option>
              <option value="166">Agroforestal</option>
              <option value="167">Comercial</option>
              <option value="168">Cultural</option>
              <option value="169">Educativo</option>
              <option value="170">Forestal</option>
              <option value="171">Habitacional</option>
              <option value="172">Industrial</option>
              <option value="173">
                Infraestructura asociada a producción agropecuaria
              </option>
              <option value="174">Infraestructura hidráulica</option>
              <option value="175">Infraestructura de saneamiento básico</option>
              <option value="176">Infraestructura seguridad</option>
              <option value="177">Infraestructura transporte</option>
              <option value="178">Institucional</option>
              <option value="179">Minería e hidrocarburos</option>
              <option value="180">Lote urbanizable no urbanizado</option>
              <option value="181">Lote urbanizado no construido</option>
              <option value="182">Lote no urbanizable</option>
              <option value="183">Pecuario</option>
              <option value="184">Recreacional</option>
              <option value="185">Religioso</option>
              <option value="186">Salubridad</option>
              <option value="187">Servicios funerarios</option>
              <option value="188">Uso público</option>
            </select>
          </div>
          <div className="w-1/3 flex flex-col ml-4">
            <label className="font-semibold">Clase Suelo* :</label>
            <select
              onChange={Load_Data}
              name="clase_suelo"
              className="border-2 p-1 rounded-md w-full"
            >
              <option></option>
              <option value="84">Urbano</option>
              <option value="85">Rural</option>
              <option value="86">Expansión urbana</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/3 flex flex-col ">
            <label className="font-semibold">Categoria Suelo* :</label>
            <select
              onChange={Load_Data}
              name="categoria_suelo"
              className="border-2 p-1 rounded-md w-full"
            >
              <option></option>
              <option value="777">Suburbano</option>
              <option value="778">Protección</option>
            </select>
          </div>
          <div className="w-1/3 flex flex-col ml-4">
            <button
              onClick={sendData}
              className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2 mt-2"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalPredioForm = React.forwardRef((props, ref) => {
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
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <PredioForm contexto={true} dataid={dataId} onClose={closeModal} />
    </Modal>
  );
});
export const NormalPredioForm = React.forwardRef((props, ref) => {
  return (
    <div className="p-4 w-11/12 flex flex-col overflow-auto bg-transparent h-full bg-white bg-opacity-80 items-start">
      <PredioForm contexto={false} />
    </div>
  );
});
