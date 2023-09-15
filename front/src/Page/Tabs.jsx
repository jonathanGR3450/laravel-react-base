import React, { useState } from "react";

const Tabs = ({ tabs, est }) => {
  const [djson, setDjson] = useState(est);
  const inicial = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(inicial[0]);

  function setdatos() {
    return djson;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDjson({ ...djson, [name]: value });
  };
  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };
  const Tab = ({ data }) => {
    const ini = data[0];

    return (
      <div className="w-full flex flex-row items-center justify-center">
        {Object.entries(data[1]).map((item) => {
          const data = ini + "_" + item[0];
          return (
            <div className="flex flex-col  pb-2 w-full text-center mr-4">
              <h5 className="w-full"> {item[0]}</h5>
              <select
                name={data}
                value={djson[data]}
                onChange={handleChange}
                className="p-1 w-full text-center border-2 rounded-md overflow-auto"
              >
                <option value="No Cargo"></option>
                {Object.entries(item[1]).map((sel) => {
                  const sele = sel[1];
                  return <option value={sele.Puntaje}>{sele.Nombre}</option>;
                })}
              </select>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className=" w-full">
      <div className="flex border-b border-gray-300">
        {Object.entries(tabs).map((tab) => {
          return (
            <button
              key={tab}
              className={`${
                activeTab === tab[0]
                  ? " text-black border-teal-800 border-2"
                  : ""
              } flex-1   bg-teal-500 text-white  font-medium py-2`}
              onClick={(e) => handleClick(e, tab[0])}
            >
              {tab[0]}
            </button>
          );
        })}
      </div>
      <div className=" py-2">
        {Object.entries(tabs).map((tab) => {
          if (tab[0] === activeTab) {
            return <Tab data={tab} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
/*


{Object.entries(tipo[1]).map((sel) => {
                const sele = sel[1];
                return <option value={sele.Puntaje}>{sele.Nombre}</option>;
              })}

<select className="p-1 w-2/3 text-center border-2 rounded-md">
        <option></option>
        {Object.entries(data).map((sel) => {
          console.log("Opciones", sel);
          //const sele = sel[1];
          //return <option value={sele.Puntaje}>{sele.Nombre}</option>;
        })}
      </select>


 const prueba = [tab.data[0]];
            return (
              <div className="w-full" key={tab[0]}>
                {prueba.map((item, index) => (
                  <Tab data={item} />
                ))}
              </div>
            );




onClick={(e) => handleClick(e, tab.label)}




Tabla 
  <table className="w-3/4  text-center text-base font-light  border-solid ">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr className="whitespace-nowrap px-6 py-4">
            {keys.map((header) => (
              <th scope="col" className="px-6 py-4" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              className="border-b dark:border-neutral-500 text-center"
              key={index}
            >
              {keys.map((header) => (
                <td className="whitespace-nowrap px-6 py-4" key={header}>
                  {item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

*/
