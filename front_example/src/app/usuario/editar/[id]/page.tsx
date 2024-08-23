"use client";

import UserDataFrame from "@/app/components/UserDataFrame/UserDataFrame";
import { StatesResponse } from "@/app/types/StateResponse";
import { UserResponseAPI } from "@/app/types/user";
import { ModelUserDetail } from "@/app/user/user.model";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Editar = () => {
  const router = useRouter();
  const { id } = useParams();

  const [stateResponse, setStateResponse] = useState<StatesResponse>({
    isError: false,
    isLoading: false,
    errorMessage: undefined,
  });

  const [response, setResponse] = useState<UserResponseAPI | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await ModelUserDetail(
          parseInt(id as string),
          setStateResponse
        );
        setResponse(user);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return stateResponse.isLoading ? (
    <div className="text-primary p-3 fw-bolder fs-4">
      Usuario Sendo Carregado...
    </div>
  ) : (
    <div className="m-5">
      <title>Editar Usuário</title>
      <fieldset className="d-flex flex-column gap-3 m-1 p-3 border rounded-3 w-50 justify-content-center align-content-center">
        <legend className="float-none w-auto">Editar Usuário</legend>
        <fieldset className="d-flex gap-3 flex-column">
          {response && (
            <UserDataFrame user={response} disabled={false}>
              <div className="col-10 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-danger me-3"
                  onClick={() => router.back()}
                >
                  Voltar
                </button>
                <button type="submit" className="btn btn-outline-success">
                  Enviar
                </button>
              </div>
            </UserDataFrame>
          )}
          {stateResponse.isError && (
            <div className="text-primary p-3 fw-bolder fs-4">
              Usuario Não Encontrado...
            </div>
          )}
        </fieldset>
      </fieldset>
    </div>
  );
};

export default Editar;
