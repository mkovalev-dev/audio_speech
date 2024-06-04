import { ReactElement, useContext, useEffect, useState } from "react";
import { Button, Modal, Select } from "antd";
import { IoCall, IoCallOutline } from "react-icons/io5";
import { useSocket } from "../hooks";
import { DataContext } from "../providers";

export function RequestCallModal(): ReactElement {
  const { socket } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [fromUserCall, setFromUserCall] = useState("");
  const { originalVoice, setOriginalVoice, translateVoice, setTranslateVoice } =
    useContext(DataContext);

  useEffect(() => {
    if (socket) {
      socket.on("requestCall", (data: { from: string }) => {
        setFromUserCall(data.from);
        setIsOpen(true);
      });
      socket.on("cancelRequestCall", () => {
        setIsOpen(false);
      });
    }
  }, [socket]);

  const handleCancelRequestCall = (fromUser: string) => {
    if (socket) {
      socket.emit("cancelOfferCall", { from: fromUser });
      setIsOpen(false);
    }
  };

  const handleAcceptRequestCall = (fromUser: string) => {
    if (socket) {
      socket.emit("acceptOfferCall", { from: fromUser });
      setIsOpen(false);
    }
  };

  return (
    <Modal closable={false} centered footer={[]} open={isOpen} width={350}>
      <div className={"flex justify-center items-center flex-col"}>
        <IoCallOutline className={"w-full h-14 animate-pulse"} />
        <h1 className={"loading text-lg font-light mt-4"}>Request a call...</h1>
        <span className={"text-neutral-500 text-sm"}>
          from: <b>{fromUserCall}</b>
        </span>
        <Select
          allowClear
          variant="filled"
          className={"w-full mb-2 mt-6"}
          options={[
            { label: "Russian", value: "RU" },
            { label: "English", value: "EN-US" },
          ].filter((el) => el.value !== translateVoice)}
          size={"large"}
          placeholder={"Please select original voice language"}
          onChange={(value) => setOriginalVoice(value)}
        />
        <Select
          allowClear
          variant="filled"
          className={"w-full"}
          options={[
            { label: "Russian", value: "RU" },
            { label: "English", value: "EN-US" },
          ].filter((el) => el.value !== originalVoice)}
          size={"large"}
          placeholder={"Please select translate voice language"}
          onChange={(value) => setTranslateVoice(value)}
        />
        <Button
          onClick={() => handleAcceptRequestCall(fromUserCall)}
          size={"large"}
          block
          disabled={!translateVoice || !originalVoice}
          className={"animate-bounce mt-4 bg-green-600 hover:!bg-green-500"}
          type={"primary"}
        >
          <div className={"flex items-center justify-center gap-2"}>
            <IoCall className={"text-center"} />
            <span className={"font-medium"}>Accept</span>
          </div>
        </Button>
        <Button
          size={"large"}
          block
          ghost
          danger
          className={"mt-2"}
          type={"primary"}
          onClick={() => handleCancelRequestCall(fromUserCall)}
        >
          <div className={"flex items-center justify-center gap-2"}>
            <IoCall className={"text-center rotate-[135deg]"} />
            <span className={"font-medium"}>Cancel</span>
          </div>
        </Button>
        <p className={"mt-2 text-center m-0 text-yellow-700 text-xs"}>
          To receive a call, please indicate the original language and the
          target language
        </p>
      </div>
    </Modal>
  );
}
