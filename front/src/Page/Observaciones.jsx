import { Modal } from "./Modal";
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
const Observaciones = React.forwardRef((props, ref) => {
  console.log(props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [observacion, setObservacion] = useState("");
  const [id, setId] = useState();
  const openModal = (data) => {
    setId(data);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  function sendData() {
    props.data.map((item, index) => {
      if (index == id) {
        console.log(item);
        item.observaciones = observacion;
        closeModal();
      }
    });
  }
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <label>Escribir Observaciones</label>
      <textarea
        onChange={(e) => setObservacion(e.target.value)}
        className="w-full border-2"
        rows="4"
        cols="50"
        value={observacion}
      ></textarea>
      <button
        onClick={sendData}
        className="     p-2 text-center rounded text-white bg-teal-500 text-lg mr-2 cursor-pointer
      hover:bg-teal-700 transition-colors "
      >
        Guardar
      </button>
    </Modal>
  );
});

export default Observaciones;
