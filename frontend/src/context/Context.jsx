/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useContext, useState } from "react";
const dataContext = React.createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {

  const contextElement = {
    //have to add data, it will pass to all components
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
