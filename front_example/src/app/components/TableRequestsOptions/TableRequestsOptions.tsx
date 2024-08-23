"use client";

import Link from "next/link";
import UserModalDelete from "../UserModalDelete/UserModalDelete";
import { useState } from "react";

const TableRequestsOptions = ({ id, name }: { id: number; name: string }) => {
  const [modal, setModal] = useState<boolean>(false);

  const onCloseModal = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true);
  };

  return (
    <div className="d-flex w-25 flex-row  justify-content-center gap-3">
      <Link href="/usuario/${requisicao.numero_requisicao}">
        <i className="bi bi-eye-fill"></i>
      </Link>

      <Link className="deleta" href="" onClick={showModal}>
        <i className="bi bi-x-circle-fill"></i>
      </Link>
    </div>
  );
};

export default TableRequestsOptions;
