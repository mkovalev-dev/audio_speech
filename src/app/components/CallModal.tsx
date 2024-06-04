import { ReactElement, useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { HeaderCall } from "./call-components/header-call.tsx";
import { EndCallBtn } from "./call-components/end-call-btn.tsx";
import { useOpenCallModal } from "../hooks/useOpenCallModal.ts";
import { useSocket } from "../hooks";
import { DataContext } from "../providers";

export function CallModal(): ReactElement {
  const { isOpen, remoteUserId, setIsOpen } = useOpenCallModal();
  const { socket } = useSocket();
  const [streamInstance, setStreamInstance] = useState<MediaStream>();
  const { originalVoice, translateVoice } = useContext(DataContext);

  useEffect(() => {
    if (isOpen && socket) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        setStreamInstance(stream);
        lopper();
        function lopper() {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = function (blob) {
            socket?.emit("audioTransfer", {
              audio: blob.data,
              to: remoteUserId,
              originalVoice: originalVoice,
              translateVoice: translateVoice,
            });
            lopper(); // it will create a fresh MediaRecorder instance
          };
          recorder.start(9999999999);
          setTimeout(function () {
            recorder.stop(); // stop recorder after every time-slice
          }, 1000);
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (socket) {
      socket.on("audioTransfer", async (data) => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = data.text;
        const voices = window.speechSynthesis.getVoices();
        speech.voice = voices[0]; // Выбираем первый голос (можно выбрать другой)
        // Проигрываем текст на динамике
        window.speechSynthesis.speak(speech);
      });
    }
  }, [socket]);

  return (
    <Modal closable={false} centered footer={[]} open={isOpen} width={300}>
      <HeaderCall remoteUserId={remoteUserId} />
      <EndCallBtn
        remoteUserId={remoteUserId}
        streamInstance={streamInstance}
        setIsOpen={setIsOpen}
      />
    </Modal>
  );
}
