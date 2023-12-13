import { useState } from "react";
import useInfo from "../hooks/useInfo";
const InfoTerreno = () => {
  const { numPredial } = useInfo();
  console.log(numPredial);
  const { data: info } = numPredial;

  // Verificar si 'info' y 'Predio' existen antes de desestructurar
  const { Predio } = info || {};
  const { area_terreno, avaluo_terreno, manzana_vereda_codigo } = Predio
    ? Predio[0].terreno
    : {};

  const [areaTerreno, setAreaTerreno] = useState(area_terreno);
  const [avaluoTerreno, setAvaluoTerreno] = useState(avaluo_terreno);
  const [manzanaVeredaCodigo, setManzanaVeredaCodigo] = useState(
    manzana_vereda_codigo
  );
  const [estInput, setEstInput] = useState(true);

  const editToggle = (e) => {
    e.preventDefault();
    setEstInput((prevEstInput) => !prevEstInput);
  };
  return (
    <>
      <div className=" text-center m-5 border ">Terreno</div>
      <form className=" flex flex-col" action="">
        <div className=" grid grid-cols-6 gap-6 ">
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className=" font-light m-2" htmlFor="manzanaVeredaCodigo">
              Manzana/Vereda
            </label>
            <input
              type="text"
              id="manzanaVeredaCodigo"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full"
              placeholder=""
              value={manzanaVeredaCodigo ? manzanaVeredaCodigo : ""}
              onChange={(e) => setManzanaVeredaCodigo(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="areaTerreno">
              Area
            </label>
            <input
              type="text"
              id="areaTerreno"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={areaTerreno ? areaTerreno : ""}
              onChange={(e) => setAreaTerreno(e.target.value)}
            />
          </div>
          <div className=" col-span-6 sm:col-span-3 lg:col-span-2">
            <label className="font-light m-2" htmlFor="avaluoTerreno">
              Avaluo
            </label>
            <input
              type="text"
              id="avaluoTerreno"
              disabled={estInput}
              className=" border-2 rounded-lg text-center w-full "
              placeholder=""
              value={avaluoTerreno ? avaluoTerreno : ""}
              onChange={(e) => setAvaluoTerreno(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row w-full mt-4 items-center justify-center">
          <button
            onClick={editToggle}
            className="p-2 text-center rounded-md text-white bg-orange-700"
          >
            Editar
          </button>
          <button className="p-2 ml-4 text-center rounded-md text-white bg-teal-500">
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default InfoTerreno;