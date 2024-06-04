import logo from "../assets/Speech_ASR.svg";
import { ReactElement, useContext, useState } from "react";
import { SocketContext } from "../providers";

export function Header(): ReactElement {
  const { socket } = useContext(SocketContext);
  const [socketId, setSocketId] = useState<string>();

  socket?.on("connect", () => {
    setSocketId(socket.id);
  });

  return (
    <>
      <img src={logo} alt={"logo"} />
      <h1 className={"text-white text-xl font-light "}>
        Speech Recognition Stream
      </h1>
      <span className={"mb-6 text-neutral-700 text-xs"}>Test environment</span>
      <span className={"text-neutral-500 text-sm"}>
        Your ID: <b>{socketId}</b>
      </span>
      <span className={"mb-6 text-neutral-700 text-xs"}>
        You can pass this identifier to another user to make a call
      </span>
    </>
  );
}
