import { useRef } from "react";
import { NormalInteresadoForm } from "../Page/Interesado";
import useInfo from "../hooks/useInfo";
import TablaInteresados from "./TablaInteresados";

const InfoInteresados = () => {
  const { numPredial } = useInfo();
  console.log("Info Interesados", numPredial);
  const { data: info } = numPredial;
  console.log("data Info", info);
  const { Predio } = info || {};
  const { derechos } = Predio ? Predio[0] : {};
  const { interesado_lc_interesado } = derechos ? derechos[0] : {};
  const { interesado_lc_agrupacioninteresados } = derechos ? derechos[0] : {};
  let estData = "";
  {
    derechos == undefined
      ? interesado_lc_interesado &&
        (interesado_lc_interesado.t_id == null
          ? (estData = true)
          : (estData = false))
      : null;
  }
  let dataInteresado = estData
    ? interesado_lc_agrupacioninteresados.interesados
    : interesado_lc_interesado;
  console.log("interedaso data", dataInteresado);

  const interesadoRef = useRef();
  const openInteresado = () => {
    interesadoRef.current.openModal();
  };
  const editToggle = (e) => {
    e.preventDefault();
    //setEstInput((prevEstInput) => !prevEstInput);
    openInteresado();
  };
  return (
    <>
      <div className="w-full text-center">Interesados</div>
      <div className="w-full">
        <TablaInteresados data={derechos} />
      </div>
      <div className="flex flex-row w-full  justify-center items-center mt-4 ml-4">
        <button
          onClick={editToggle}
          className="py-2 px-4 text-center rounded-md text-white bg-orange-700"
        >
          Editar
        </button>

        <NormalInteresadoForm
          ref={interesadoRef}
          est={estData}
          data={dataInteresado}
        />
      </div>
    </>
  );
};
export default InfoInteresados;
