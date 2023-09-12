import LogoColor from "../img/LogoColor.png";
import ApiTest from "./Api";

const Tablero = () => {
  return <p></p>;
};

export default Tablero;
/*
  const [db, setDb] = useState();
  const [numdata, setnumData] = useState(" ");
  const handleChange = (event) => {
    event.preventDefault();
    setnumData(event.target.value);
  };

  function Load_Data(e) {
    e.preventDefault();
    let api = ApiTest();
    let url = import.meta.env.VITE_API_URL;
    api.get(url).then((response) => {
      if (!response.err) {
        setDb(response);
      } else {
        setDb(null);
      }
    });
  }
  


  <form
        className="z-40 flex flex-row w-full items-center p-2"
        onSubmit={Load_Data}
      >
        <input
          type="text"
          className="p-2  w-3/4 text-center border-2 rounded-md "
          value={numdata}
          onChange={handleChange}
        ></input>
        <input
          type="submit"
          value="Buscar"
          className="p-2 w-1/4 text-center border-2 rounded-md  text-white bg-teal-500"
        ></input>
      </form>
      {db != undefined && <Tabla data={db} />}
  */
