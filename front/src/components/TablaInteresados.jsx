import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useImperativeHandle, useState } from "react";
import { Modal } from "../Page/Modal";
import { ValidarInteresado } from "../Page/Interesado";
const TablaInteresados = (props) => {
  console.log("props tabla interesado", props);
  let derechos = props.data;
  const { interesado_lc_interesado } = derechos ? derechos[0] : {};
  const { interesado_lc_agrupacioninteresados } = derechos ? derechos[0] : {};
  let estData = "";
  {
    derechos != undefined
      ? interesado_lc_interesado &&
        (interesado_lc_interesado.t_id == null
          ? (estData = true)
          : (estData = false))
      : null;
  }
  const [dataInteresado, setDataInteresado] = useState(
    estData
      ? interesado_lc_agrupacioninteresados.interesados
      : interesado_lc_interesado
  );
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
  const interesadoRef = useRef();
  const openUniInteresado = (e) => {
    e.preventDefault();
    interesadoRef.current.openModal();
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
              <td colSpan={3}>No hay Datos</td>
            </tr>
          ) : estData ? (
            dataInteresado.map((item, index) => {
              let nom_documento = "";
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
                  <td>{item.tipo.dispname}</td>
                  <td>{nom_documento}</td>
                  <td>{item.documento_identidad}</td>
                  <td>{item.nombre}</td>
                  <td></td>
                  <td>
                    <button
                      onClick={openUniInteresado}
                      className="py-2 px-4 text-center rounded-md text-white bg-orange-700"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
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
          )}
        </tbody>
      </table>
      <ModalUniInteresado ref={interesadoRef} update={setDataInteresado} />
    </div>
  );
};
const ModalUniInteresado = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
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
        update={props.update}
        onClose={closeModal}
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
