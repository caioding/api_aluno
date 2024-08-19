"use client";

import Link from "next/link";
import UserTable from "../components/UserTable/UserTable";
import { useForm } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  tipoReq: "login" | "todos" | "nome";
  busca: string;
};

const Usuario = () => {
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const [reqType, setReqType] = useState<Inputs | null>(null);

  const onSubmit = (data: Inputs) => {
    setReqType({ tipoReq: data.tipoReq, busca: data.busca });
  };

  if (watch("tipoReq") == "todos") {
    setValue("busca", "Todos Selecionado");
  } else {
    setValue("busca", "");
  }

  return (
    <div>
      <title>Usuário</title>
      <div className="m-4 p-3">
        <div className="d-flex flex-row justify-content-between">
          <Link
            className="btn btn-outline-success fw-bolder"
            href="/usuario/criar"
          >
            Novo Usuário
          </Link>

          <form className="d-flex flex-row" onSubmit={handleSubmit(onSubmit)}>
            <select
              className="form-select w-50 mx-1"
              id="tipo"
              {...register("tipoReq")}
            >
              <option value="nome" selected>
                Nome
              </option>
              <option value="login">Login</option>
              <option value="todos">Todos</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar por usuário"
              id="inputBusca"
              required
              {...register("busca")}
              disabled={watch("tipoReq") == "todos" ? true : false}
            />
            <button className="btn btn-outline-primary mx-1" type="submit">
              Buscar
            </button>
          </form>
        </div>

        <div className="h-100">
          <UserTable reqTypes={reqType} />
        </div>
      </div>
    </div>
  );
};

export default Usuario;
