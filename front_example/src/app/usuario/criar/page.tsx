"use client";

import UserFormCreate from "@/app/components/UserFormCreate/UserFormCreate";

const Criar = () => {
  return (
    <div className="m-5">
      <title>Criação de Usuário</title>

      <fieldset className="d-flex flex-column gap-3 m-1 p-3 border rounded-3 w-50 justify-content-center align-content-center">
        <legend className="float-none w-auto">Cadastrar Novo Usuário</legend>

        <UserFormCreate />
      </fieldset>
    </div>
  );
};

export default Criar;
