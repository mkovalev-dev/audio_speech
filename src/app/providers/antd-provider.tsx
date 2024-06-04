import { PropsWithChildren, ReactElement } from "react";
import { ConfigProvider, theme } from "antd";

export function AntdProvider({ children }: PropsWithChildren): ReactElement {
  const { darkAlgorithm } = theme;
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
        token: { fontFamily: "Montserrat" },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
