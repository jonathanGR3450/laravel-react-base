import { Modal } from "./Modal";
import React from "react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
  useRef,
} from "react";
import FichaPredial from "./FichaPredial";
export const LoadCaracteristicasForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    console.log("Abre Modal");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  const ConvForm = () => {
    const ConvTableData = () => {
      return (
        <table className="w-full  mt-4">
          <thead className="uppercase border-2  bg-teal-500 text-base text-white">
            <tr>
              <th className="border-2 rounded-xl p-2">Check</th>
              <th className="border-2 rounded-xl p-2">ID</th>
              <th className="border-2 rounded-xl p-2">Construccion</th>
              <th className="border-2 rounded-xl p-2">Dominio</th>
              <th className="border-2 rounded-xl p-2">Unidad Const</th>
              <th className="border-2 rounded-xl p-2">Planta</th>
              <th className="border-2 rounded-xl p-2">Habitaciones</th>
              <th className="border-2 rounded-xl p-2">Baños</th>
              <th className="border-2 rounded-xl p-2">Locales</th>
              <th className="border-2 rounded-xl p-2">Plantas</th>
              <th className="border-2 rounded-xl p-2">Uso</th>
              <th className="border-2 rounded-xl p-2">Area Construida</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      );
    };
    return (
      <div>
        <h2 className="text-2xl">Consultar Caracteristicas</h2>
        <div className="flex flex-row w-full">
          <div className="w-1/4">
            <label>Tipo de Construccion</label>
            <select className="border-2 rounded-lg w-full p-1 ">
              <option></option>
              <option value={66}>Convencional</option>
              <option value={67}>No Convencional</option>
            </select>
          </div>
          <div className="w-1/4 ml-4">
            <label>Tipo de Dominio</label>
            <select className="border-2 rounded-lg w-full p-1 ">
              <option></option>
              <option value={322}>Común</option>
              <option value={323}>Privado</option>
            </select>
          </div>
          <div className="w-1/4  ml-4">
            <label>Tipo de Unidad de Construccion</label>
            <select className="border-2 rounded-lg w-full p-1 ">
              <option></option>
              <option value="539">Residencial</option>
              <option value="540">Comercial</option>
              <option value="541">Industrial</option>
              <option value="542">Institucional</option>
              <option value="543">Anexo</option>
            </select>
          </div>
          <div className="w-1/4  ml-4">
            <label>Tipo de Planta</label>
            <select className="border-2 rounded-lg w-full p-1 ">
              <option></option>
              <option value="680">Piso</option>
              <option value="681">Mezanine</option>
              <option value="682">Sótano</option>
              <option value="683">Semisótano</option>
              <option value="684">Subterráneo</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-1/4">
            <label>Total Habitaciones</label>
            <input
              type="text"
              className="border-2 rounded-lg w-full p-1 "
            ></input>
          </div>
          <div className="w-1/4  ml-4">
            <label>Total Baños</label>
            <input
              type="text"
              className="border-2 rounded-lg w-full p-1 "
            ></input>
          </div>
          <div className="w-1/4  ml-4">
            <label>Total Locales</label>
            <input
              type="text"
              className="border-2 rounded-lg w-full p-1 "
            ></input>
          </div>
          <div className="w-1/4  ml-4">
            <label>Total Plantas</label>
            <input
              type="text"
              className="border-2 rounded-lg w-full p-1"
            ></input>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-1/4">
            <label>Uso</label>
            <select className="border-2 rounded-lg w-full p-1 ">
              <option></option>
              <option value="220">
                (Residencial) Apartamentos 4 y más pisos en PH
              </option>
              <option value="221">
                (Residencial) Apartamentos en edificio de 4 y 5 pisos
                (Cartagena)
              </option>
              <option value="222">
                (Residencial) Apartamentos más de 4 pisos
              </option>
              <option value="223">(Residencial) Barracas</option>
              <option value="224">(Residencial) Casa elbas</option>
              <option value="225">(Residencial) Depósitos o lockers</option>
              <option value="226">(Residencial) Garajes cubiertos</option>
              <option value="227">(Residencial) Garajes en PH</option>
              <option value="228">(Residencial) Salón comunal</option>
              <option value="229">(Residencial) Secadero de ropa</option>
              <option value="230">(Residencial) Vivienda colonial</option>
              <option value="231">(Residencial) Vivienda hasta 3 pisos</option>
              <option value="232">
                (Residencial) Vivienda hasta 3 pisos en PH
              </option>
              <option value="233">(Residencial) Vivienda recreacional</option>
              <option value="234">
                (Residencial) Vivienda recreacional en PH
              </option>
              <option value="235">
                (Comercial) Bodegas comerciales - Grandes almacenes
              </option>
              <option value="236">(Comercial) Bodegas comerciales en PH</option>
              <option value="237">(Comercial) Centros comerciales</option>
              <option value="238">(Comercial) Centros comerciales en PH</option>
              <option value="239">(Comercial) Clubes - Casinos</option>
              <option value="240">(Comercial) Comercio</option>
              <option value="241">(Comercial) Comercio colonial</option>
              <option value="242">(Comercial) Comercio en PH</option>
              <option value="243">(Comercial) Hotel colonial</option>
              <option value="244">(Comercial) Hoteles</option>
              <option value="245">(Comercial) Hoteles en PH</option>
              <option value="246">(Comercial) Oficinas - Consultorios</option>
              <option value="247">
                (Comercial) Oficinas - Consultorios coloniales
              </option>
              <option value="248">
                (Comercial) Oficinas consultorios en PH
              </option>
              <option value="249">(Comercial) Parque de diversiones</option>
              <option value="250">(Comercial) Parqueaderos</option>
              <option value="251">(Comercial) Parqueaderos en PH</option>
              <option value="252">(Comercial) Pensiones y residencias</option>
              <option value="253">(Comercial) Plaza de mercado</option>
              <option value="254">(Comercial) Restaurante colonial</option>
              <option value="255">(Comercial) Restaurantes</option>
              <option value="256">(Comercial) Restaurantes en PH</option>
              <option value="257">(Comercial) Teatro - Cinemas</option>
              <option value="258">(Comercial) Teatro - Cinemas en PH</option>
              <option value="259">(Industrial) Bodega casa bomba</option>
              <option value="260">(Industrial) Bodegas casa bomba en PH</option>
              <option value="261">(Industrial) Industrias</option>
              <option value="262">(Industrial) Industrias en PH</option>
              <option value="263">(Industrial) Talleres</option>
              <option value="264">(Institucional) Aula de clases</option>
              <option value="265">(Institucional) Biblioteca</option>
              <option value="266">(Institucional) Cárceles</option>
              <option value="267">(Institucional) Casas de culto</option>
              <option value="268">
                (Institucional) Clínicas, hospitales, centros médicos
              </option>
              <option value="269">
                (Institucional) Colegios y universidades
              </option>
              <option value="270">(Institucional) Coliseos</option>
              <option value="271">
                (Institucional) Entidad educativa colonial colegio colonial
              </option>
              <option value="272">(Institucional) Estadios</option>
              <option value="273">(Anexo) Fuertes y Castillos</option>
              <option value="274">(Institucional) Iglesia</option>
              <option value="275">(Institucional) Iglesia en PH</option>
              <option value="276">
                (Institucional) Instalaciones militares
              </option>
              <option value="277">
                (Institucional) Jardín infantil en casa
              </option>
              <option value="278">(Institucional) Parque Cementerio</option>
              <option value="279">(Institucional) Planetario</option>
              <option value="280">(Institucional) Plaza de toros</option>
              <option value="281">(Institucional) Puestos de salud</option>
              <option value="282">(Institucional) Museos</option>
              <option value="283">(Institucional) Seminarios, conventos</option>
              <option value="284">(Institucional) Teatro</option>
              <option value="285">(Institucional) Unidad deportiva</option>
              <option value="286">
                (Institucional) Velódromo, patinódromo
              </option>
              <option value="287">(Anexo) Albercas - Bañaderas</option>
              <option value="288">(Anexo) Beneficiaderos</option>
              <option value="289">(Anexo) Camaroneras</option>
              <option value="290">(Anexo) Canchas</option>
              <option value="291">(Anexo) Canchas de tenis</option>
              <option value="292">(Anexo) Carretera</option>
              <option value="293">(Anexo) Cerramiento</option>
              <option value="294">
                (Anexo) Cimientos, estructura, muros y placa base
              </option>
              <option value="295">
                (Anexo) Cocheras - Marraneras - Porquerizas
              </option>
              <option value="296">
                (Anexo) Construcción en membrana arquitectónica
              </option>
              <option value="297">(Anexo) Contenedor</option>
              <option value="298">(Anexo) Corrales</option>
              <option value="299">
                (Anexo) Establos - Pesebreras - Caballerizas
              </option>
              <option value="300">(Anexo) Estación de bombeo</option>
              <option value="301">
                (Anexo) Estación de sistema de transporte
              </option>
              <option value="302">(Anexo) Galpones - Gallineros</option>
              <option value="303">(Anexo) Hangar</option>
              <option value="304">(Anexo) Kioscos</option>
              <option value="305">(Anexo) Lagunas de oxidación</option>
              <option value="306">
                (Anexo) Marquesinas - Patios cubiertos
              </option>
              <option value="307">(Anexo) Muelles</option>
              <option value="308">(Anexo) Murallas</option>
              <option value="309">(Anexo) Pérgolas</option>
              <option value="310">(Anexo) Piscinas</option>
              <option value="311">(Anexo) Pista aeropuerto</option>
              <option value="312">(Anexo) Pozos</option>
              <option value="313">
                (Anexo) Ramadas - Cobertizos - Caneyes
              </option>
              <option value="314">(Anexo) Secaderos</option>
              <option value="315">(Anexo) Silos</option>
              <option value="316">(Anexo) Tanques</option>
              <option value="317">(Anexo) Toboganes</option>
              <option value="318">(Anexo) Torre de control</option>
              <option value="319">(Anexo) Torres de enfriamiento</option>
              <option value="320">(Anexo) Unidad predial por construir</option>
              <option value="321">(Anexo) Vía férrea</option>
            </select>
          </div>
          <div className="w-1/4 flex flex-col items-center justify-center ">
            <button className="p-2  w-1/2 text-center rounded-md text-white bg-teal-500 text-lg mr-2">
              Consultar
            </button>
          </div>
        </div>
        <ConvTableData />
        <div className="mt-4">
          <div className="w-full flex flex-col items-center justify-center">
            <button className="p-2 text-center rounded-md text-white bg-teal-500 text-lg mr-2">
              Asignar
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ConvForm />
    </Modal>
  );
});
export const CreateCaracteristicasForm = React.forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    console.log("Abre Modal");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <h2 className="text-4xl">Crear Caracteristicas </h2>
      <div className="w-full flex flex-col items-center justify-center">
        <FichaPredial />
      </div>
    </Modal>
  );
});
