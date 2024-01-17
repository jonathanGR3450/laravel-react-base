import React, { useRef, useImperativeHandle, useState } from "react";
import { Modal } from "../Page/Modal";
import { CreateUnidad } from "../Page/Uniconstruccion";

const TablaUnidadConstruccion = (props) => {
  console.log("props tabla Unidad", props);
  let alldata = props.data;
  let dataNoNull = [];
  props.data.unidad_construccion.map((item, index) => {
    if (item.t_id != null) {
      dataNoNull.push(item);
    }
  });
  let [uniConst, setUniConst] = useState(dataNoNull);
  const uniConRef = useRef();
  const openUnidadConstruccion = (e) => {
    e.preventDefault();
    uniConRef.current.openModal(e.target.name);
  };
  console.log("Data no null unidad", dataNoNull);
  return (
    <div className="text-center">
      <h2>Detalles de la Unidad de Construcción</h2>
      <table className="w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Identificador</th>
            {/* <th>Tipo Construcción</th> */}
            <th className="py-2 px-4 border-b">Área Construida</th>
            <th className="py-2 px-4 border-b">Tipo Construcción Específico</th>
            <th className="py-2 px-4 border-b">Tipo Unidad</th>
            <th className="py-2 px-4 border-b">Uso</th>
            <th className="py-2 px-4 border-b">Puntaje</th>
            {/* Agrega más encabezados según tus necesidades */}
          </tr>
        </thead>
        <tbody className="text-center">
          {uniConst?.map((unidad, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                {unidad.lc_caracteristicasunidadconstruccion.identificador}
              </td>
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
                {unidad.lc_caracteristicasunidadconstruccion.tipo_construccion
                  .t_id == 67
                  ? unidad.lc_caracteristicasunidadconstruccion
                      .calificacionnoconvencional.tipo_anexo.t_id
                  : unidad.lc_caracteristicasunidadconstruccion
                      .calificacionconvencional.total_calificacion}
              </td>
              <td>
                {" "}
                <button
                  onClick={openUnidadConstruccion}
                  name={index}
                  className="py-2 px-4 text-center rounded-md text-white bg-orange-700"
                >
                  Modificar Unidad de Construcion
                </button>
              </td>
              {/* Agrega más celdas según tus necesidades */}
            </tr>
          ))}
        </tbody>
      </table>
      <ModalUnidadConstrucion
        ref={uniConRef}
        update={setUniConst}
        data={alldata}
      />
    </div>
  );
};
const ModalUnidadConstrucion = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [id, setId] = useState(0);

  const openModal = (data) => {
    setId(data);
    console.log("123", id);
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
      <CreateUnidad
        est={false}
        update={props.update}
        onClose={closeModal}
        id={id}
        data={props.data}
      />
    </Modal>
  );
});
export default TablaUnidadConstruccion;
