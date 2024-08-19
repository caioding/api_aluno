"use client";

import Image from "next/image";
import footerStyle from "./style/footer.module.scss";

const MainHeader = () => {
  return (
    <header className="bg-primary py-1 row border-bottom border-3 border-warning">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Image
            src="/img/logoIfam.png"
            alt="logoIfam"
            className="img img-fluid mx-3 p-1"
            width={240}
            height={0}
          />

          <div className="">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav fs-4">
                <li className="nav-item">
                  <a
                    className={`nav-link ${footerStyle.textHouver}`}
                    aria-current="page"
                    href="#"
                  >
                    Inicio
                  </a>
                </li>

                <li className="nav-item">
                  <a className={`nav-link ${footerStyle.textHouver}`} href="#">
                    Produto
                  </a>
                </li>

                <li className="nav-item">
                  <a className={`nav-link ${footerStyle.textHouver}`} href="#">
                    Sobre
                  </a>
                </li>

                <li className="nav-item">
                  <a className={`nav-link ${footerStyle.textHouver}`} href="#">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
