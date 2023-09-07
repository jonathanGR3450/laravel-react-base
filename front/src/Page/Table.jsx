import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Table = () => {
  const location = useLocation();
  if (location.state != "") {
    const db = location.state.response;
    const keys = Object.keys(db[0]);
    const stateToSend = {};
    keys.forEach((item) => {
      stateToSend[item] = db[0][item];
    });
    return (
      <div>
        <Tab stateToSend={stateToSend} />
        <Outlet />
      </div>
    );

    function Tab({ stateToSend }) {
      const keys = Object.keys(stateToSend);
      return (
        <ul className=" flex flex-row">
          {keys.map((item) => {
            console.log(stateToSend[item]);
            return (
              <div>
                <Link
                  className="pr-4 pl-4 border-1 text-white bg-green-600 rounded-tl-2xl rounded-tr-2xl "
                  key={item}
                  to={{
                    pathname: item,
                    search: "loco",
                    state: { item },
                  }}
                >
                  {item}
                </Link>
              </div>
            );
          })}
        </ul>
      );
    }
  }
};
export default Table;

/*<li
                key={item}
                className="pr-4 pl-4 border-1 text-white bg-green-600 rounded-tl-2xl rounded-tr-2xl "
              >
                {item}
              </li> 
              
              
              
                {db.map((item) => {
          return (
            <div className="flex flex-col items-center">
              {keys.map((data) => {
                const aux = item[data];
                return <DataTable key={item} data={aux}></DataTable>;
              })}
            </div>
          );
        })}*/
