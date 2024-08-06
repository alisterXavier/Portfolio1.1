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
