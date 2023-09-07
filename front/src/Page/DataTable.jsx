import { useLocation } from "react-router-dom";
const DataTable = ({ data }) => {
  const keys = Object.keys(data[0]);
  return (
    <table className="w-3/4  text-center text-base font-light  border-black border-2 border-solid ">
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
        {data.map((item) => {
          return <DataRow key={item[keys[0]] + 8} item={item}></DataRow>;
        })}
      </tbody>
    </table>
  );
  function DataRow({ item }) {
    const aux = Object.keys(item);

    return (
      <tr className="border-b dark:border-neutral-500 text-center">
        {aux.map((header) => (
          <td className="whitespace-nowrap px-6 py-4">{item[header]}</td>
        ))}
      </tr>
    );
  }
};
export default DataTable;
