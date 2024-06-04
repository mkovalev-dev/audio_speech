import { ReactElement } from "react";
import { IoCall } from "react-icons/io5";
import { Button } from "antd";
import { useExistCallUser } from "../hooks";
import { CheckExistUserModal } from "./CheckExistUserModal.tsx";
import { CheckUserBusyModal } from "./CheckUserBusyModal.tsx";
import { RequestCallModal } from "./RequestCallModal.tsx";

type CallButtonProps = {
  disabled?: boolean;
  callingUserId: string;
};

export function CallButton(props: CallButtonProps): ReactElement {
  const { handleStartCall } = useExistCallUser();
  return (
    <>
      <Button
        size={"large"}
        block
        onClick={() => handleStartCall(props.callingUserId)}
        disabled={props.disabled}
        className={"mt-4 bg-green-600 hover:!bg-green-500 !w-1/2"}
        type={"primary"}
      >
        <div className={"flex items-center justify-center gap-2"}>
          <IoCall className={"text-center"} />
          <span className={"font-medium"}>Call</span>
        </div>
      </Button>
      <CheckExistUserModal />
      <CheckUserBusyModal />
      <RequestCallModal callingUserId={props.callingUserId} />
    </>
  );
}
