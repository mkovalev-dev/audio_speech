import { ReactElement, useEffect, useState } from "react";
import { IoFingerPrintOutline } from "react-icons/io5";
import { Button, Input, Modal } from "antd";

export function InitialNameModal(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("name")) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  const handleSaveName = () => {
    localStorage.setItem("name", name);
    setIsOpen(false);
  };
  return (
    <Modal open={isOpen} closeIcon={<></>} closable centered footer={[]}>
      <IoFingerPrintOutline className={"w-full h-12"} />
      <h2 className={"text-center mt-2 text-lg font-light"}>
        Hi, provide brief information about yourself
      </h2>
      <Input
        size={"large"}
        className={"mt-6 mb-2"}
        placeholder={"Please enter your name"}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        disabled={!name}
        size={"large"}
        block
        type={"primary"}
        onClick={handleSaveName}
      >
        Save
      </Button>
    </Modal>
  );
}
