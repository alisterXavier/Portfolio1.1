import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

interface ContextProps {
  state: string | null;
  setState: Dispatch<SetStateAction<string | null>>;
}

export const CardContext = createContext<ContextProps | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<string | null>(null);

  return (
    <CardContext.Provider value={{ state, setState }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);

  if (!context) throw new Error('No Context');

  return context;
};

interface ContextLoadedProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}
export const CardLoadedContext = createContext<ContextLoadedProps | null>(null);

export const CardLoadedProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<boolean>(false);

  return (
    <CardLoadedContext.Provider value={{ state, setState }}>
      {children}
    </CardLoadedContext.Provider>
  );
};

export const useCardLoadedContext = () => {
  const context = useContext(CardLoadedContext);

  if (!context) throw new Error('No Context');

  return context;
};
