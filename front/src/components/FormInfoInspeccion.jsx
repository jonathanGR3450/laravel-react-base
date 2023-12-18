import { useState } from "react";

const FormInfoInspeccion = () => {
  const [fechaInspeccion, setFechaInspeccion] = useState("");
  const [atiendeInteresado, setAtiendeInteresadon] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [domicilioNotificacion, setDomicilioNotificacion] = useState("");
  const [celular, setCelular] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [autorizaNotificaciones, setAutorizaNotificaciones] = useState("");
  const [resultadoInspeccion, setResultadoInspeccion] = useState("");
  const [otroResultadoInspeccion, setOtroResultadoInspeccion] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className=" flex flex-col" onSubmit={handleSubmit}>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className=" font-light m-2" htmlFor=" FechaInspección">
              Fecha Inspección
            </label>
            <input
              type="date"
              id="FechaInspección"
              /* disabled={estInput} */
              className=" border-2 rounded-lg text-center w-full"
              placeholder=""
              value={fechaInspeccion ? fechaInspeccion : ""}
              onChange={(e) => setFechaInspeccion(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="atiendeInteresado">
              Atiende Interesado
            </label>
            <div className="flex justify-center items-center">
              <label className=" mr-2">
                Si
                <input
                  className="m-2 items-center"
                  type="radio"
                  value="Si"
                  checked={atiendeInteresado === "Si"}
                  onChange={(e) => setAtiendeInteresadon(e.target.value)}
                />
              </label>

              <label className=" mr-2">
                No
                <input
                  className="m-2"
                  type="radio"
                  value="No"
                  checked={atiendeInteresado === "No"}
                  onChange={(e) => setAtiendeInteresadon(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="tipoDocumento">
              Tipo Documento
            </label>
            <div className="flex justify-center items-center">
              <label>
                <select
                  className=" border-2 rounded"
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="opcion1">Cedula Ciudadania</option>
                  <option value="opcion2">Cedula Extranjeria</option>
                  <option value="opcion3">NIT</option>
                  <option value="opcion4">Tarjeta de Identidad</option>
                  <option value="opcion5">Registro Civil</option>
                  <option value="opcion6">Secuencial</option>
                  <option value="opcion7">Pasaporte</option>
                </select>
              </label>
            </div>
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="numeroDocumento">
              Numero Documento
            </label>
            <input
              type="text"
              id="numeroDocumento"
              /* disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={numeroDocumento ? numeroDocumento : ""}
              onChange={(e) => setNumeroDocumento(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="primerNombre">
              Primer Nombre
            </label>
            <input
              type="text"
              id="primerNombre"
              /* disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={primerNombre ? primerNombre : ""}
              onChange={(e) => setPrimerNombre(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="segundoNombre">
              Segundo Nombre
            </label>
            <input
              type="text"
              id="segundoNombre"
              /* disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={segundoNombre ? segundoNombre : ""}
              onChange={(e) => setSegundoNombre(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="primerApellido">
              Primer Apellido
            </label>
            <input
              type="text"
              id="primerApellido"
              /* disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={primerApellido ? primerApellido : ""}
              onChange={(e) => setPrimerApellido(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="segundoApellido">
              Segundo Apellido
            </label>
            <input
              type="text"
              id="segundoApellido"
              /*  disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={segundoApellido ? segundoApellido : ""}
              onChange={(e) => setSegundoApellido(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="domicilioNotificacion">
              Domicilio Notificación
            </label>
            <input
              type="text"
              id="domicilioNotificacion"
              /* disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={domicilioNotificacion ? domicilioNotificacion : ""}
              onChange={(e) => setDomicilioNotificacion(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="celular">
              Numero Celular
            </label>
            <input
              type="text"
              id="celular"
              /* disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={celular ? celular : ""}
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="correoElectronico">
              Correo Electronico
            </label>
            <input
              type="text"
              id="correoElectronico"
              /* disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={correoElectronico ? correoElectronico : ""}
              onChange={(e) => setCorreoElectronico(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="autorizaNotificaciones">
              Folio de matricula inmobiliaria
            </label>
            <div className="flex justify-center items-center">
              <label className=" mr-2">
                Si
                <input
                  className="m-2 items-center"
                  type="radio"
                  value="Si"
                  checked={autorizaNotificaciones === "Si"}
                  onChange={(e) => setAutorizaNotificaciones(e.target.value)}
                />
              </label>

              <label className=" mr-2">
                No
                <input
                  className="m-2"
                  type="radio"
                  value="No"
                  checked={autorizaNotificaciones === "No"}
                  onChange={(e) => setAutorizaNotificaciones(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="resultadoInspeccion">
              Resultado Inspección
            </label>
            <input
              type="text"
              id="resultadoInspeccion"
              /* disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full"
              placeholder=""
              value={resultadoInspeccion ? resultadoInspeccion : ""}
              onChange={(e) => setResultadoInspeccion(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="otroResultadoInspeccion">
              Otro, ¿Cual?
            </label>
            <input
              type="text"
              id="otroResultadoInspeccion"
              /*   disabled={estInput} */
              className="  border-2 rounded-lg text-center w-full "
              placeholder=""
              value={otroResultadoInspeccion ? otroResultadoInspeccion : ""}
              onChange={(e) => setOtroResultadoInspeccion(e.target.value)}
            />
          </div>
        </div>
        <input
          type="submit"
          value="Agregar Inspección"
          className=" m-5 
      p-2 text-center rounded text-white bg-teal-500 text-lg mr-2 cursor-pointer
      hover:bg-teal-700 transition-colors uppercase "
        />
      </form>
    </>
  );
};

export default FormInfoInspeccion;
