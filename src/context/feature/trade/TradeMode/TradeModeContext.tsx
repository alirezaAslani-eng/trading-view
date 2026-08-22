"use client";
import useUpdateEffect from "@/hooks/app/useUpdateEffect";
import { TradeModeStore } from "./helpers";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type TradeModeContextValue = {
  isDemo: boolean;
  setIsDemo: Dispatch<SetStateAction<boolean>>;
};

export const TradeModeContext = createContext<TradeModeContextValue | null>(
  null,
);

export const TradeModeProvider = ({ children }: PropsWithChildren) => {
  const [isDemo, setIsDemo] = useState(false);

  //#region // * ------------ Sync isDemo with localStorage & queries ------------
  useUpdateEffect(() => {
    TradeModeStore.storeIsDemo(isDemo);
  }, [isDemo]);
  //#endregion // * ------------ Sync isDemo with localStorage & queries ------------

  const value: TradeModeContextValue = { isDemo, setIsDemo };

  return <TradeModeContext value={value}>{children}</TradeModeContext>;
};

// TODO Implement this hook completely to notify user when their demo mode expired while interaction
// const x = 10 * 1000;

// function useExpireIn(isDemo: boolean, onExpire: () => void = () => {}) {
//   const { expIn } = TradeModeStore.getTradeModeConfig();

//   const { remainingSeconds } = useCountdown(!expIn ? 0 : expIn - Date.now());

//   const onExpireHandler = useEffectEvent(onExpire);

//   useEffect(() => {
//     if (!isDemo || remainingSeconds > 5) return;
//     onExpireHandler();
//   }, [isDemo, remainingSeconds]);
// }
