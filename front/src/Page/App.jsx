import Ruta from "../Routes/Routes";
import { TableProvider } from "./Context/Context";
const App = () => {
  return (
    <>
      <TableProvider>
        <Ruta />
      </TableProvider>
    </>
  );
};

export default App;
