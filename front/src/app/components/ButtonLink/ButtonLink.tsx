"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
};

const ButtonLink = ({ href, children }: ButtonProps) => {
  let status = false;

  const pathName = usePathname();

  if (pathName.split("/")[1] == href.split("/")[1]) status = true;

  return (
    <Link
      href={href}
      className={`btn btn${
        status ? "-success" : "-outline-success"
      } w-100 fw-bolder`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
