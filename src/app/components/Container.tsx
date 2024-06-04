import { PropsWithChildren, ReactElement } from "react";

export function Container({ children }: PropsWithChildren): ReactElement {
  return (
    <div
      className={
        "w-screen h-screen bg-gradient-to-bl from-stone-950 to-neutral-800 flex justify-center items-center flex-col"
      }
    >
      <div className={"w-1/2 flex justify-center items-center flex-col"}>
        {children}
      </div>
    </div>
  );
}
