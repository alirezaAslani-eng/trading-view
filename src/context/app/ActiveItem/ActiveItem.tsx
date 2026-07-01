import { createContext, useContext, useState, type ReactNode } from "react";

interface ActiveItemContextValue {
  activeId: string;
  setId: (id: string) => void;
  removeId: () => void;
  toggleId: (id: string) => void;
}

const ActiveItemContext = createContext<ActiveItemContextValue | undefined>(
  undefined,
);

interface ActiveItemProviderProps {
  children: ReactNode;
}

function ActiveItemProvider({ children }: ActiveItemProviderProps) {
  const [activeId, setActiveId] = useState("");

  const setId = (id: string) => {
    setActiveId(id);
  };

  const removeId = () => {
    setActiveId("");
  };

  const toggleId = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <ActiveItemContext.Provider value={{ setId, activeId, removeId, toggleId }}>
      {children}
    </ActiveItemContext.Provider>
  );
}

function useActiveItemContext() {
  const context = useContext(ActiveItemContext);
  return context;
}

export { ActiveItemProvider, useActiveItemContext };
