import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const inicial = [tabs[0].label];
  const [activeTab, setActiveTab] = useState(inicial);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className=" w-full">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.label}
              className={`${
                activeTab === tab.label
                  ? " text-black border-teal-800 border-2"
                  : ""
              } flex-1   bg-teal-500 text-white  font-medium py-2`}
              onClick={(e) => handleClick(e, tab.label)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className=" py-4">
        {tabs.map((tab) => {
          if (tab.label === activeTab) {
            const prueba = [tab.data[0]];
            return (
              <div className="w-full" key={tab.label}>
                {prueba.map((item, index) => (
                  <Tab data={item} />
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ data }) => {
  const keys = Object.keys(data[0]);
  return (
    <div className="w-full flex flex-row items-center justify-center">
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
    </div>
  );
};
export { Tabs, Tab };
/*

onClick={(e) => handleClick(e, tab.label)}*/
