"use client";

import UserDataFrame from "@/app/components/UserDataFrame/UserDataFrame";
import UserModalDelete from "@/app/components/UserModalDelete/UserModalDelete";
import { StatesResponse } from "@/app/types/StateResponse";
import { UserResponseAPI } from "@/app/types/user";
import { ModelUserDetail } from "@/app/user/user.model";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Detalhar = () => {
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

  const [modal, setModal] = useState<boolean>(false);

  const onCloseModal = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true);
  };

  return stateResponse.isLoading ? (
    <div className="text-primary p-3 fw-bolder fs-4">
      Usuario Sendo Carregado...
    </div>
  ) : (
    <div className="m-5">
      <title>Detalhes do Usuário</title>
      <fieldset className="d-flex flex-column gap-3 m-1 p-3 border rounded-3 w-50 justify-content-center align-content-center">
        <legend className="float-none w-auto">Detalhes do Usuário</legend>
        <fieldset className="d-flex gap-3 flex-column">
          {response && (
            <UserDataFrame user={response} disabled={true}>
              <div className="col-10 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-primary fw-medium"
                  onClick={() => router.back()}
                >
                  Voltar
                </button>

                <Link
                  href={`/usuario/editar/${response.id}`}
                  className="btn btn-outline-warning fw-medium ms-2"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-outline-danger fw-medium ms-2 deleta"
                  onClick={showModal}
                >
                  Deletar
                </button>
              </div>

              <UserModalDelete
                show={modal}
                onClose={onCloseModal}
                name={response.nome}
                id={response.id}
              />
            </UserDataFrame>
          )}
        </fieldset>

        <div
          className="modal fade"
          id="confirmaDelecao"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Confirmação de Deleção
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Confirma a deleção do usuário:{" "}
                <em className="fw-medium text-warning" id="usuarioModal"></em>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger fw-medium"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <a href="#" className="btn btn-outline-success fw-medium">
                  Confirmar
                </a>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Detalhar;
