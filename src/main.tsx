import ReactDOM from "react-dom/client";
import "./app/css/index.css";
import { AntdProvider, DataProvider, SocketProvider } from "./app/providers";
import { App } from "./app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AntdProvider>
    <SocketProvider url={"http://95.163.223.109:8080"}>
      <DataProvider>
        <App />
      </DataProvider>
    </SocketProvider>
  </AntdProvider>,
);
