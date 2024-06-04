import { ReactElement } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

type HeaderCallProps = {
  remoteUserId: string;
};

export function HeaderCall({ remoteUserId }: HeaderCallProps): ReactElement {
  return (
    <div className={"flex flex-col justify-center items-center"}>
      <Avatar size={100}>
        <UserOutlined style={{ fontSize: "150%" }} />
      </Avatar>
      <span className={"mt-2 text-neutral-400"}>{remoteUserId}</span>
    </div>
  );
}
