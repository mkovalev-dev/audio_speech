import { useSocket } from "./useSocket.ts";
import { useContext, useEffect } from "react";
import { message } from "antd";
import { DataContext } from "../providers";
import { useRequestCall } from "./useRequestCall.ts";

export function useUserBusy() {
  const { socket } = useSocket();
  const { setIsOpenUserBusy } = useContext(DataContext);
  const { handleRequestCall } = useRequestCall();
  const handleStartCheckUserBusy = (callingUserId: string) => {
    if (socket) {
      setIsOpenUserBusy(true);
      setTimeout(() => {
        socket.emit("checkUserBusy", { to: callingUserId });
      }, 1000);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on(
        "checkUserBusy",
        (data: { user_busy: boolean; calling_user: string }) => {
          setIsOpenUserBusy(false);
          if (data.user_busy) {
            message.warning("User is busy");
          } else {
            handleRequestCall(data.calling_user);
          }
        },
      );
    }
  }, [socket]);

  return { handleStartCheckUserBusy };
}
