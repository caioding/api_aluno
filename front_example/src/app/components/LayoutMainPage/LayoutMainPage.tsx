"use client";

import { usePathname } from "next/navigation";
import Main from "../Main/Main";
import MainFooter from "../MainFooter/MainFooter";
import MainHeader from "../MainHeader/MainHeader";

type LayoutMainPageProps = {
  children: React.ReactNode;
};

const LayoutMainPage = ({ children }: LayoutMainPageProps) => {
  const pathName = usePathname();
  return pathName == "/login" ? (
    <div>{children}</div>
  ) : (
    <div className="container-fluid d-flex min-vh-100 flex-column flex-grow-0 justify-content-center align-content-center">
      <MainHeader />
      <div className=" flex-grow-1 d-flex align-content-center justify-content-center">
        <Main>{children}</Main>
      </div>
      <MainFooter />
    </div>
  );
};

export default LayoutMainPage;
