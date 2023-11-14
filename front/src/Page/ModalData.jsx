import React from "react";
import { ModalNoClose } from "./ModalNoClose";
import { useImperativeHandle, useState } from "react";

export const ModalData = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (data) => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));
  function returndata(e) {
    let { name } = e.target;
    console.log(name);
    if (name === "si") {
      props.onChange(1);
    } else {
      props.onChange(0);
    }
    closeModal();
  }

  return (
    <ModalNoClose isOpen={isModalOpen} onClose={closeModal}>
      <div className="w-full flex flex-col text-center">
        <h2 className="text-3xl">¿Deseas segregar mas predios? </h2>
        <div className="flex flex-row w-full justify-center mt-4">
          <button
            name="si"
            onClick={returndata}
            className="p-2 w-1/6 text-center rounded-md text-white bg-teal-500 text-lg mr-2"
          >
            SI
          </button>
          <button
            onClick={returndata}
            name="no"
            className="p-2 w-1/6 text-center rounded-md text-white bg-teal-500 text-lg mr-2"
          >
            NO
          </button>
        </div>
      </div>
    </ModalNoClose>
  );
});
