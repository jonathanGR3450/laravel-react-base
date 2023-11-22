import { useContext } from "react";
import InfoContext from "../Page/Context/InfoProvider";

const useInfo = () => {
  return useContext(InfoContext);
};

export default useInfo;
