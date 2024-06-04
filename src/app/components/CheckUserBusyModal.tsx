import { ReactElement, useContext } from "react";
import { Modal, Spin } from "antd";
import { DataContext } from "../providers";

export function CheckUserBusyModal(): ReactElement {
  const { isOpenUserBusy } = useContext(DataContext);
  return (
    <Modal
      open={isOpenUserBusy}
      width={"auto"}
      centered
      styles={{
        content: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      closable={false}
      footer={[]}
    >
      <div className={"flex flex-col items-center justify-center gap-4"}>
        <Spin size={"large"} />
        <span className={"text-xs text-neutral-500"}>
          Checking user busy...
        </span>
      </div>
    </Modal>
  );
}
