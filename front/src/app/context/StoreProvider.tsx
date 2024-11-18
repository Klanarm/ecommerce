"use client";
import { createContext, useState, useEffect } from "react";

interface AccInfo {
  info: string | null;
}

interface Auth {
  token: string | null;
}

interface StoreContextType {
  accInfo: AccInfo;
  setAccInfo: (accInfo: AccInfo) => void;
  auth: Auth;
  setAuth: (auth: Auth) => void;
  pageName: string;
  setPageName: (pageName: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }) => {
  const [pageName, setPageName] = useState("");
  const [auth, setAuth] = useState<Auth>({
    token: null,
  });
  const [accInfo, setAccInfo] = useState<AccInfo>({
    info: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("auth");
      const storedInfo = localStorage.getItem("info");

      if (storedAuth) {
        setAuth({ token: JSON.parse(storedAuth).token || null });
      }

      if (storedInfo) {
        setAccInfo({ info: JSON.parse(storedInfo).info || null });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("info", JSON.stringify(accInfo));
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [accInfo, auth]);

  return (
    <StoreContext.Provider
      value={{
        auth,
        setAuth,
        accInfo,
        setAccInfo,
        pageName,
        setPageName,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
