"use client";

import MainSide from "../MainSide/MainSide";
import "./main.scss";

type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return (
    <main className="d-flex flex-row flex-grow-1 row custom-container">
      <MainSide />
      <div className="rounded-2 m-0 p-0 col-10">{children}</div>
    </main>
  );
};

export default Main;
