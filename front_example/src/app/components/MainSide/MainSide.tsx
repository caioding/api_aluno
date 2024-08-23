"use client ";

import Image from "next/image";
import ButtonLink from "../ButtonLink/ButtonLink";
import Link from "next/link";

type Page = {
  title: string;
  href: string;
};

const MainSide = () => {
  const pages: Page[] = [
    { title: "Usuário", href: "/usuario" },
    { title: "Requisições", href: "/requisicoes" },
    { title: "Identificação", href: "/identificacao" },
    { title: "Análise", href: "/analise" },
    { title: "Projeto", href: "/projeto" },
    { title: "Implementação", href: "/implementacao" },
    { title: "Teste de Sistema", href: "/testedesistema" },
    { title: "Teste de Aceite", href: "/testedeaceite" },
    { title: "Entrega", href: "/entrega" },
  ];

  return (
    <div className="col-2 m-0 p-1">
      <div className="d-flex flex-column flex-shrink-0 p-3 h-100 rounded-2">
        <Link
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <Image
            src="/img/logo_sistema.png"
            className="img img-fluid px-1"
            alt="logo_sistema"
            width={150}
            height={100}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column gap-2 h-100">
          {pages.map((page) => (
            <li key={page.title} className="nav-item">
              <ButtonLink href={page.href}>{page.title}</ButtonLink>
            </li>
          ))}
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default MainSide;
