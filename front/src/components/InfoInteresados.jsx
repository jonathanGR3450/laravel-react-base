import React, { useRef, useState } from "react";
import TablaInteresados from "./TablaInteresados";

const InfoInteresados = () => {
  return (
    <>
      <div className="w-full text-center">Interesados</div>
      <div className="w-full">
        <TablaInteresados />
      </div>
    </>
  );
};

export default InfoInteresados;
