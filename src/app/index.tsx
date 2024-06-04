import { ReactElement, useContext, useState } from "react";
import { Input, Select } from "antd";
import { CallButton, Container, Header } from "./components";
import { InitialNameModal } from "./components/InitialNameModal.tsx";
import { RequestCallModal } from "./components/OfferCallModal.tsx";
import { CallModal } from "./components/CallModal.tsx";
import { DataContext } from "./providers";

export function App(): ReactElement {
  const [callingUserId, setCallingUserId] = useState<string>("");
  const { originalVoice, setOriginalVoice, translateVoice, setTranslateVoice } =
    useContext(DataContext);
  return (
    <Container>
      <Header />
      <Input
        size={"large"}
        variant="filled"
        className={"w-1/2 mb-2"}
        placeholder={"Called user ID "}
        onChange={(e) => setCallingUserId(e.target.value)}
      />
      <Select
        allowClear
        variant="filled"
        className={"w-1/2 mb-2"}
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
        className={"w-1/2"}
        options={[
          { label: "Russian", value: "RU" },
          { label: "English", value: "EN-US" },
        ].filter((el) => el.value !== originalVoice)}
        size={"large"}
        placeholder={"Please select translate voice language"}
        onChange={(value) => setTranslateVoice(value)}
      />
      <CallButton
        disabled={!callingUserId || !translateVoice || !originalVoice}
        callingUserId={callingUserId}
      />
      <span className={"mt-2 text-neutral-700 text-xs"}>
        To make an audio call, enter remote user ID
      </span>
      <InitialNameModal />
      <RequestCallModal />
      <CallModal />
    </Container>
  );
}
