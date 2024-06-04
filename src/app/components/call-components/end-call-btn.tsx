import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { IoCall } from "react-icons/io5";
import { Button } from "antd";
import { useSocket } from "../../hooks";

type EndCallBtnProps = {
  remoteUserId: string;
  streamInstance: MediaStream | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function EndCallBtn({
  remoteUserId,
  streamInstance,
  setIsOpen,
}: EndCallBtnProps): ReactElement {
  const { socket } = useSocket();

  const handleEndCall = () => {
    socket?.emit("endCall", { from: remoteUserId });
    streamInstance?.getTracks().forEach(function (track) {
      track.stop();
    });
    setIsOpen(false);
    window.location.reload(); //костыль
  };

  useEffect(() => {
    socket?.on("endCall", () => {
      streamInstance?.getTracks().forEach(function (track) {
        track.stop();
      });
      setIsOpen(false);
      window.location.reload(); //костыль
    });
  }, [socket]);

  return (
    <Button
      size={"large"}
      block
      ghost
      danger
      className={"mt-2"}
      type={"primary"}
      onClick={handleEndCall}
    >
      <div className={"flex items-center justify-center gap-2"}>
        <IoCall className={"text-center rotate-[135deg]"} />
        <span className={"font-medium"}>End call</span>
      </div>
    </Button>
  );
}
