import { useSocket } from "./useSocket.ts";
import { useState } from "react";

export function useOpenCallModal() {
  const { socket } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [remoteUserId, setRemoteUserId] = useState("");

  socket?.on("acceptOfferCall", (data: { from: string; to: string }) => {
    setIsOpen(true);
    let userAudioTo;
    if (socket.id === data.from) {
      userAudioTo = data.to;
    } else {
      userAudioTo = data.from;
    }
    setRemoteUserId(userAudioTo);
  });

  return { isOpen, remoteUserId, setIsOpen };
}
