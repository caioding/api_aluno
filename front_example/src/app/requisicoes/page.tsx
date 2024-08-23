"use client";

import Link from "next/link";
import RequestsTable from "../components/RequestsTable/RequestsTable";
import { useState } from "react";

const Requisicoes = () => {
  const [countRequest, setCountRequest] = useState<number>(0);

  return (
    <div>
      <div className="m-4 p-3">
        <title>Requisições</title>
        <div className="d-flex flex-row  justify-content-between">
          <Link
            className="btn btn-outline-warning fw-bolder"
            href={{
              pathname: "/requisicoes/criar",
              query: { countRequest: countRequest.toString() },
            }}
          >
            Nova Requisição
          </Link>
        </div>

        <div className="h-100">
          <RequestsTable countTableRows={setCountRequest} />
        </div>
      </div>
    </div>
  );
};

export default Requisicoes;
