import { ReactElement, useContext, useEffect } from "react";
import { Button, message, Modal } from "antd";
import { DataContext } from "../providers";
import { IoCall, IoCallOutline } from "react-icons/io5";
import { useSocket } from "../hooks";

export function RequestCallModal({
  callingUserId,
}: {
  callingUserId: string;
}): ReactElement {
  const { isOpenRequestCall, setIsOpenRequestCall } = useContext(DataContext);
  const { socket } = useSocket();

  const handleCancelRequestCall = () => {
    if (socket) {
      socket.emit("cancelRequestCall", { to: callingUserId });
      setIsOpenRequestCall(false);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("cancelOfferCall", () => {
        setIsOpenRequestCall(false);
        message.info("The user rejected the call");
      });
      socket.on("acceptOfferCall", () => {
        setIsOpenRequestCall(false);
      });
    }
  }, [socket]);

  return (
    <Modal
      closable={false}
      centered
      footer={[]}
      open={isOpenRequestCall}
      width={300}
    >
      <div className={"flex justify-center items-center flex-col"}>
        <IoCallOutline className={"w-full h-14"} />
        <h1 className={"loading text-lg font-light mt-4"}>Сalling...</h1>
        <span className={"text-neutral-500 text-sm"}>
          to: <b>{callingUserId}</b>
        </span>
        <Button
          size={"large"}
          block
          className={"mt-4 bg-red-600 hover:!bg-red-500"}
          type={"primary"}
          onClick={handleCancelRequestCall}
        >
          <div className={"flex items-center justify-center gap-2"}>
            <IoCall className={"text-center rotate-[135deg]"} />
            <span className={"font-medium"}>Cancel</span>
          </div>
        </Button>
      </div>
    </Modal>
  );
}
