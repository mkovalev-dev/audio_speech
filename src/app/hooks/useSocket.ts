import { useContext } from "react";
import { SocketContext } from "../providers";

export function useSocket() {
  return useContext(SocketContext);
}
