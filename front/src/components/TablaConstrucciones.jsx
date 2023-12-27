import React, { useRef, useImperativeHandle, useState } from "react";
import { Modal } from "../Page/Modal";
import { CreateConstruction } from "../Page/Construccion";

const TablaConstrucciones = (props) => {
  console.log("props tabla Construcciones", props);
  let alldata = props.data;
  const dataNoNull = [];
  props.data.construccion.map((item, index) => {
    if (item.t_id != null) {
      dataNoNull.push(item);
    }
  });
  let [construccion, setConstruccion] = useState(dataNoNull);

  const construccionRef = useRef();
  const openConstruccion = (e) => {
    e.preventDefault();
    construccionRef.current.openModal(e.target.name);
  };
  return (
    <div>
      <table className="min-w-full font-normal bg-white border border-gray-300 mt-4 text-center">
        {" "}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Identificador</th>
            <th className="py-2 px-4 border-b">Tipo Construccion</th>
            <th className="py-2 px-4 border-b">Avaluo</th>
            <th className="py-2 px-4 border-b">Area</th>
            <th className="py-2 px-4 border-b">Acción</th>
          </tr>
        </thead>
        <tbody>
          {construccion == undefined ? (
            <tr>
              <td colSpan={3}>No hay Datos</td>
            </tr>
          ) : (
            construccion.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.identificador}</td>
                  <td>
                    {item.tipo_construccion.dispname
                      ? item.tipo_construccion.dispname
                      : item.tipo_construccion == 66
                      ? "Convencional"
                      : "No Convencional"}
                  </td>
                  <td>{item.avaluo_construccion}</td>
                  <td>{item.area_construccion}</td>
                  <td>
                    {" "}
                    <button
                      onClick={openConstruccion}
                      name={index}
                      className="py-2 px-4 text-center rounded-md text-white bg-orange-700"
                    >
                      Cambiar Construcion
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <ModalUniConstrucion
        ref={construccionRef}
        update={setConstruccion}
        data={alldata}
      />
    </div>
  );
};
const ModalUniConstrucion = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [unid, setUnid] = useState();
  const openModal = (data) => {
    setUnid(data);
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
      <CreateConstruction
        est={false}
        update={props.update}
        onClose={closeModal}
        id={unid}
        data={props.data}
      />
    </Modal>
  );
});
export default TablaConstrucciones;
