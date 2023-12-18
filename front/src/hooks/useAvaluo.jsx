import { useContext } from "react";
import AvaluoContext from "../Page/Context/AvaluoProvider";

const useAvaluo = () => {
  return useContext(AvaluoContext);
};
export default useAvaluo;
