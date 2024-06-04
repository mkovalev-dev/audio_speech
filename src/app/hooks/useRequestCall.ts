import { useSocket } from "./useSocket.ts";
import { useContext } from "react";
import { DataContext } from "../providers";

export function useRequestCall() {
  const { socket } = useSocket();
  const { setIsOpenRequestCall } = useContext(DataContext);

  const handleRequestCall = (callingUserId: string) => {
    if (socket) {
      setIsOpenRequestCall(true);
      socket.emit("requestCall", { to: callingUserId });
    }
  };

  return { handleRequestCall };
}
