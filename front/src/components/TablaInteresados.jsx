import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useImperativeHandle, useState } from "react";
import useInfo from "../hooks/useInfo";
import { Modal } from "../Page/Modal";
import { ValidarInteresado } from "../Page/Interesado";
import { NormalInteresadoForm } from "../Page/Interesado";
const TablaInteresados = (props) => {
  const { numPredial } = useInfo();
  console.log("Info Interesados", numPredial);
  const { data: info } = numPredial;
  console.log("123 data Info", info);
  const { Predio } = info || {};
  const { derechos } = Predio ? Predio[0] : {};
  const { interesado_lc_interesado } = derechos ? derechos[0] : {};
  let { interesado_lc_agrupacioninteresados } = derechos ? derechos[0] : {};
  let estData = "";
  {
    derechos != undefined
      ? interesado_lc_interesado &&
        (interesado_lc_interesado.t_id == null
          ? (estData = true)
          : (estData = false))
      : null;
  }
  console.log("123", estData);
  const [dataInteresado, setDataInteresado] = useState([
    estData
      ? interesado_lc_agrupacioninteresados.interesados
      : interesado_lc_interesado,
  ]);

  async function updatedata(newData) {
    let data = newData;
    console.log("1234", data);
    if (data.length > 1) {
      numPredial.data.Predio[0].derechos[0].interesado_lc_agrupacioninteresados.interesados =
        newData;
      numPredial.data.Predio[0].derechos[0].interesado_lc_interesado.t_id =
        null;
      console.log("neuvos datos tabla", data.length);
    } else {
      numPredial.data.Predio[0].derechos[0].interesado_lc_interesado = data[0];
    }
    setDataInteresado(newData);
  }
  console.log("interedaso data", dataInteresado);

  let nom_documento = "";
  if (!estData && derechos != undefined) {
    switch (dataInteresado.tipo_documento) {
      case 529:
        nom_documento = "Cédula de ciudadanía";
        break;
      case 530:
        nom_documento = "Cédula de extranjería";
        break;
      case 531:
        nom_documento = "NIT";
        break;
      case 532:
        nom_documento = "Tarjeta de identidad";
        break;
      case 533:
        nom_documento = "Registro civil";
        break;
      case 534:
        nom_documento = "Secuencial";
        break;
      case 535:
        nom_documento = "Pasaporte";
        break;
      default:
        nom_documento = "Vacio";
        break;
    }
  }
  ///Cambio de Datos
  const interesadoRef = useRef();
  const openUniInteresado = (e) => {
    e.preventDefault();
    let { name } = e.target;
    console.log(name);
    interesadoRef.current.openModal(name);
  };

  ///Agregar Datos
  const interesadosRef = useRef();
  const editToggle = (e) => {
    e.preventDefault();
    let { name } = e.target;
    console.log(name);
    interesadosRef.current.openModal();
  };

  return (
    <div>
      <table className="min-w-full font-normal bg-white border border-gray-300 mt-4 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Tipo Interesado</th>
            <th className="py-2 px-4 border-b">Tipo de Documento</th>
            <th className="py-2 px-4 border-b">Numero de Documento</th>
            <th className="py-2 px-4 border-b">Nombre/Razon Social</th>
            {estData ? (
              <th className="py-2 px-4 border-b">Participacion</th>
            ) : null}
            <th className="py-2 px-4 border-b">Accion</th>
          </tr>
        </thead>
        <tbody>
          {derechos == undefined ? (
            <tr>
              <td colSpan={5}>No hay Datos</td>
            </tr>
          ) : (
            dataInteresado.map((item, index) => {
              let nom_documento = "";
              console.log("123 item", item);
              if (item.length != undefined) {
                return item.map((items, index) => {
                  console.log("123 1231", items);
                  switch (items.tipo_documento) {
                    case 529:
                      nom_documento = "C.C.";
                      break;
                    case 530:
                      nom_documento = "C.E.";
                      break;
                    case 531:
                      nom_documento = "NIT";
                      break;
                    case 532:
                      nom_documento = "T.I.";
                      break;
                    case 533:
                      nom_documento = "Registro Civil";
                      break;
                    case 534:
                      nom_documento = "Secuencial";
                      break;
                    case 535:
                      nom_documento = "Pasaporte";
                      break;
                    default:
                      nom_documento = "";
                      break;
                  }
                  return (
                    <tr key={index}>
                      <td>
                        {estData
                          ? Array.isArray(items.tipo)
                            ? items.tipo.dispname
                            : items.tipo == 658
                            ? "PERSONA NATURAL"
                            : "PERSONA JURIDICA"
                          : items.tipo == 658
                          ? "PERSONA NATURAL"
                          : "PERSONA JURIDICA"}
                      </td>
                      <td>{nom_documento}</td>
                      <td>{items.documento_identidad}</td>
                      <td>{items.nombre}</td>
                      {estData ? <td></td> : null}
                      <td>
                        <button
                          name={index}
                          onClick={openUniInteresado}
                          className="py-2 px-4 text-center rounded-md text-white bg-orange-700"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  );
                });
              } else {
                switch (item.tipo_documento) {
                  case 529:
                    nom_documento = "C.C.";
                    break;
                  case 530:
                    nom_documento = "C.E.";
                    break;
                  case 531:
                    nom_documento = "NIT";
                    break;
                  case 532:
                    nom_documento = "T.I.";
                    break;
                  case 533:
                    nom_documento = "Registro Civil";
                    break;
                  case 534:
                    nom_documento = "Secuencial";
                    break;
                  case 535:
                    nom_documento = "Pasaporte";
                    break;
                  default:
                    nom_documento = "Vacio";
                    break;
                }
                return (
                  <tr key={index}>
                    <td>
                      {estData
                        ? Array.isArray(item.tipo)
                          ? item.tipo.dispname
                          : item.tipo == 658
                          ? "PERSONA NATURAL"
                          : "PERSONA JURIDICA"
                        : item.tipo == 658
                        ? "PERSONA NATURAL"
                        : "PERSONA JURIDICA"}
                    </td>
                    <td>{nom_documento}</td>
                    <td>{item.documento_identidad}</td>
                    <td>{item.nombre}</td>
                    {estData ? <td></td> : null}
                    <td>
                      <button
                        name={index}
                        onClick={openUniInteresado}
                        className="py-2 px-4 text-center rounded-md text-white bg-orange-700"
                      >
                        Cambiar Interesado
                      </button>
                    </td>
                  </tr>
                );
              }
            })
          )}
        </tbody>
      </table>
      <ModalUniInteresado
        ref={interesadoRef}
        data={dataInteresado}
        update={updatedata}
      />
      <div className="flex flex-row w-full  justify-center items-center mt-4 ml-4">
        <button
          onClick={editToggle}
          className="py-2 px-4 text-center rounded-md text-white bg-teal-500"
        >
          Agregar Interesados
        </button>
        <NormalInteresadoForm
          ref={interesadosRef}
          est={estData}
          data={dataInteresado}
          update={updatedata}
        />
      </div>
    </div>
  );
};
const ModalUniInteresado = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [unid, setUnid] = useState();
  const openModal = (id) => {
    setUnid(id);
    console.log(unid);
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
      <ValidarInteresado
        est={false}
        data={props.data}
        update={props.update}
        onClose={closeModal}
        id={unid}
      />
    </Modal>
  );
});
export default TablaInteresados;
/*   {datosUnidadConstruccion?.map((unidad, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{unidad.identificador}</td>

              <td className="py-2 px-4 border-b">{unidad.area_construida}</td>
              <td className="py-2 px-4 border-b">
                {
                  unidad.lc_caracteristicasunidadconstruccion.tipo_construccion
                    .dispname
                }
              </td>
              <td className="py-2 px-4 border-b">
                {
                  unidad.lc_caracteristicasunidadconstruccion
                    .tipo_unidad_construccion.dispname
                }
              </td>
              <td className="py-2 px-4 border-b">
                {unidad.lc_caracteristicasunidadconstruccion.uso.dispname}
              </td>
              <td className="py-2 px-4 border-b">
                {
                  unidad.lc_caracteristicasunidadconstruccion
                    .calificacionconvencional.total_calificacion
                }
              </td>
            </tr>
          ))}*/

/*
           estData ? () : (
            <tr>
              <td>
                {dataInteresado.tipo == 658
                  ? "PERSONA NATURAL"
                  : "PERSONA JURIDICA"}
              </td>
              <td>{nom_documento}</td>
              <td>{dataInteresado.documento_identidad}</td>
              <td>
                {dataInteresado.tipo == 658
                  ? dataInteresado.nombre
                  : dataInteresado.razon_social}
              </td>
              <td>
                <button
                  onClick={openUniInteresado}
                  className="py-2 px-4 m-1 text-center rounded-md text-white bg-orange-700"
                >
                  Cambiar Propietario
                </button>
              </td>
            </tr>
          ) */
