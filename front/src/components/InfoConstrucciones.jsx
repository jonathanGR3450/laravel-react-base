import { NormalConstruccionForm } from "../Page/Construccion";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import useInfo from "../hooks/useInfo";
import TablaConstrucciones from "./TablaConstrucciones";
const InfoConstrucciones = () => {
  const { numPredial } = useInfo();
  const { data: info } = numPredial;
  const { Predio } = info || {};
  const { construccion } = Predio ? Predio[0] : {};
  console.log("data construccion", construccion);
  const construccionRef = useRef();
  const openConstruccion = () => {
    construccionRef.current.openModal();
  };
  const editToggle = (e) => {
    e.preventDefault();
    //setEstInput((prevEstInput) => !prevEstInput);
    openConstruccion();
  };
  return (
    <>
      <div className="w-full text-center">Info Construcciones</div>
      <div className="w-full">
        <TablaConstrucciones data={construccion} />
      </div>
      <div className="flex flex-row w-full items-center justify-center ml-4">
        <button
          onClick={editToggle}
          className="py-2 px-4 text-center rounded-md text-white bg-orange-700"
        >
          Editar
        </button>

        <NormalConstruccionForm ref={construccionRef} />
      </div>
    </>
  );
};

export default InfoConstrucciones;
