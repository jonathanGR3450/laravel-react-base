import Table from "./Table";
const BTramite = () => {
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
};
function Tabla({ data }) {
  const keys = Object.keys(data[0]);
  const dataArray = [data[0]];
  const tabs = keys.map((item) => ({
    label: item,
    data: dataArray.map((items) => items[item]),
  }));
  return <Tabs tabs={tabs}></Tabs>;
}
export default BTramite;
