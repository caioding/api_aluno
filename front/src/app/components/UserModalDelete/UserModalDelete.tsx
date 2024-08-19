"use client";

import { useUsersFetchContext } from "@/app/hooks/fetch/useUsersFetchContext";
import { StatesResponse } from "@/app/types/StateResponse";
import { ModelUserDelete, ModelUserList } from "@/app/user/user.model";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { isErrored } from "stream";

type UserModalDelete = {
  show: boolean;
  onClose: () => void;
  name: string;
  id: number;
};

const UserModalDelete = ({ show, onClose, name, id }: UserModalDelete) => {
  const [stateResponse, setStateResponse] = useState<StatesResponse>({
    isError: false,
    isLoading: false,
    errorMessage: undefined,
  });

  const usersFetchContext = useUsersFetchContext();
  const router = useRouter();

  const updateUserlist = async () => {
    try {
      const response = await ModelUserList(setStateResponse);
      usersFetchContext.setUserFetch(response);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await ModelUserDelete(id, setStateResponse);
      if (response) {
        toast.success(response.menssage);
        updateUserlist();
        onClose();
        router.push("/usuario");
      }
    } catch (err) {
      console.log(err);
    }
    if (stateResponse.isError) toast.error(stateResponse.errorMessage);
  };
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      id="confirmaDelecao"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
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
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            Confirma a deleção do usuário:
            <em className="fw-medium text-warning" id="usuarioModal">
              {name}
            </em>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger fw-medium"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="btn btn-outline-success fw-medium"
              onClick={deleteUser}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModalDelete;
