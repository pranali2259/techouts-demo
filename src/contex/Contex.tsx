import { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  empId: number;
  empName: string;
  topicsSelected: string[];
}

interface Data {
  message: string;
  userData: UserData;
}

interface ResponseContextType {
  response: Data | null;
  updateResponse: (response: Data) => void;
}

const defaultContextValue: ResponseContextType = {
  response: null,
  updateResponse: () => {},
};

const ResponseContext = createContext<ResponseContextType>(defaultContextValue);

export const useResponse = () => {
  return useContext(ResponseContext);
};

interface ResponseProviderProps {
  children: ReactNode;
}

export const ResponseProvider = ({ children }: ResponseProviderProps) => {
  const [response, setResponse] = useState<Data | null>(null);

  const updateResponse = (newResponse: Data) => {
    setResponse(newResponse);
  };

  return (
    <ResponseContext.Provider value={{ response, updateResponse }}>
      {children}
    </ResponseContext.Provider>
  );
};
