import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketProvider extends PropsWithChildren {
  url: string;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const SocketContext = createContext<{
  socket: Socket | undefined;
}>();

export function SocketProvider({
  url,
  children,
}: SocketProvider): ReactElement {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [url]);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
}
