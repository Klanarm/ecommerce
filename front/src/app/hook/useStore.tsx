import { useContext } from "react";
import StoreContext from "@/app/context/StoreProvider";

const useStore = () => {
  return useContext(StoreContext);
};

export default useStore;
