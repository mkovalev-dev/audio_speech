import { ReactElement, useContext } from "react";
import { Modal, Spin } from "antd";
import { DataContext } from "../providers";

export function CheckExistUserModal(): ReactElement {
  const { isOpenExistUser } = useContext(DataContext);
  return (
    <Modal
      open={isOpenExistUser}
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
          Checking user availability...
        </span>
      </div>
    </Modal>
  );
}
