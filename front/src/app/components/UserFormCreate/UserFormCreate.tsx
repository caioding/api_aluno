"use client";

import { StatesResponse } from "@/app/types/StateResponse";
import { CreateUserAPI, CreateUserResponseAPI } from "@/app/types/user";
import { ModelUserCreate } from "@/app/user/user.model";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UserFormCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserAPI>();

  const router = useRouter();

  const [stateResponse, setStateResponse] = useState<StatesResponse>({
    isError: false,
    isLoading: false,
    errorMessage: undefined,
  });

  const onSubmit: SubmitHandler<CreateUserAPI> = async (data) => {
    try {
      const response = await ModelUserCreate(data, setStateResponse);

      if (response) {
        toast.success(response.menssage);
        router.push("/");
      }
    } catch (error) {
      toast.error(stateResponse.errorMessage);
    }
  };

  return (
    <form
      className="d-flex gap-3 flex-column"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group row">
        <label htmlFor="nome" className="col-sm-2 col-form-label">
          Nome
        </label>
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            id="nome"
            placeholder="Nome"
            {...register("nome", { required: true })}
          />
          {errors.nome && (
            <span className="text-danger fw-medium p-1 fs-6">
              Nome é obrigatório
            </span>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="login" className="col-sm-2 col-form-label">
          Login
        </label>
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            id="login"
            placeholder="Login"
            {...register("login", { required: true })}
          />
          {errors.login && (
            <span className="text-danger fw-medium p-1 fs-6">
              Login é obrigatório
            </span>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="senha" className="col-sm-2 col-form-label">
          Senha
        </label>
        <div className="col-10">
          <input
            type="password"
            className="form-control"
            id="senha"
            placeholder="Senha"
            {...register("senha", { required: true, minLength: 6 })}
          />
          {errors.senha?.type == "required" && (
            <span className="text-danger fw-medium p-1 fs-6">
              Senha é obrigatória
            </span>
          )}
          {errors.senha?.type == "minLength" && (
            <span className="text-danger fw-medium p-1 fs-6">
              Minimo 6 digitos
            </span>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="email" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-10">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="examplo@email.com"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
          {errors.email?.type === "required" && (
            <span className="text-danger fw-medium p-1 fs-6">
              Email é obrigatório
            </span>
          )}

          {errors.email?.type === "pattern" && (
            <span className="text-danger fw-medium p-1 fs-6">
              Email invalido
            </span>
          )}
        </div>
      </div>

      <div className="form-group row justify-content-end pt-4">
        <div className="col-10 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-outline-danger me-3"
            onClick={() => {
              router.back();
            }}
          >
            Voltar
          </button>

          <button
            type="submit"
            className="btn btn-outline-success"
            disabled={stateResponse.isLoading}
          >
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserFormCreate;
