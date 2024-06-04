import { useSocket } from "./useSocket.ts";
import { useContext, useEffect } from "react";
import { message } from "antd";
import { useUserBusy } from "./useUserBusy.ts";
import { DataContext } from "../providers";

export function useExistCallUser() {
  const { socket } = useSocket();
  const { setIsOpenExistUser } = useContext(DataContext);
  const { handleStartCheckUserBusy } = useUserBusy();

  const handleStartCall = (callingUserId: string) => {
    if (socket) {
      setIsOpenExistUser(true);
      setTimeout(() => {
        socket.emit("checkExistCallingUser", { to: callingUserId });
      }, 1000);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on(
        "checkExistCallingUser",
        (data: { user_exist: boolean; calling_user: string }) => {
          setIsOpenExistUser(false);
          if (!data.user_exist) {
            message.error("User NOT found");
          } else {
            handleStartCheckUserBusy(data.calling_user);
          }
        },
      );
    }
  }, [socket]);
  return { handleStartCall };
}
