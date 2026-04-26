import { createContext, useState, useContext } from "react";
/**
 * @type {{setId:(id:string)=>void,removeId:(id:string)=>void,activeId:string}}
 */
const contextValueType = {};
const ActiveItemContext = createContext(contextValueType);

function ActiveItemProvider({ children }) {
  const [activeId, setActiveId] = useState("");

  const setId = (id) => {
    setActiveId(id);
  };
  const removeId = () => {
    setActiveId("");
  };

  return (
    <ActiveItemContext value={{ setId, activeId, removeId }}>
      {children}
    </ActiveItemContext>
  );
}

function useActiveItemContext() {
  return useContext(ActiveItemContext);
}
export { ActiveItemProvider, useActiveItemContext };
