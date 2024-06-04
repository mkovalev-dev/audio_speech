import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const DataContext = createContext<{
  isOpenExistUser: boolean;
  setIsOpenExistUser: Dispatch<SetStateAction<boolean>>;
  isOpenUserBusy: boolean;
  setIsOpenUserBusy: Dispatch<SetStateAction<boolean>>;
  isOpenRequestCall: boolean;
  setIsOpenRequestCall: Dispatch<SetStateAction<boolean>>;
  originalVoice: string;
  setOriginalVoice: Dispatch<SetStateAction<string>>;
  translateVoice: string;
  setTranslateVoice: Dispatch<SetStateAction<string>>;
}>();
export function DataProvider({ children }: PropsWithChildren): ReactElement {
  const [isOpenExistUser, setIsOpenExistUser] = useState<boolean>(false);
  const [isOpenUserBusy, setIsOpenUserBusy] = useState<boolean>(false);
  const [isOpenRequestCall, setIsOpenRequestCall] = useState<boolean>(false);
  const [originalVoice, setOriginalVoice] = useState<string>("");
  const [translateVoice, setTranslateVoice] = useState<string>("");
  return (
    <DataContext.Provider
      value={{
        isOpenExistUser,
        setIsOpenExistUser,
        isOpenUserBusy,
        setIsOpenUserBusy,
        isOpenRequestCall,
        setIsOpenRequestCall,
        originalVoice,
        setOriginalVoice,
        translateVoice,
        setTranslateVoice,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
