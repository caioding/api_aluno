"use client";

import { StatesResponse } from "@/app/types/StateResponse";
import { UpdateUserAPI, UserResponseAPI } from "@/app/types/user";
import { ModelUserUpdate } from "@/app/user/user.model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type UserDataFrameProps = {
  user: UserResponseAPI;
  disabled: boolean;
  children: React.ReactNode;
};

const UserDataFrame = ({ user, disabled, children }: UserDataFrameProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserAPI>();

  const router = useRouter();

  const [stateResponse, setStateResponse] = useState<StatesResponse>({
    isError: false,
    isLoading: false,
    errorMessage: undefined,
  });

  useEffect(() => {
    if (user) {
      setValue("id", user.id.toString());
      setValue("nome", user.nome);
      setValue("login", user.login);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<UpdateUserAPI> = async (data) => {
    const response = await ModelUserUpdate(data, setStateResponse);

    console.log(data);

    if (response) {
      toast.success(response?.menssage);
      router.back();
    }

    if (stateResponse.isError) {
      toast.error(stateResponse.errorMessage);
    }
  };

  return (
    <form
      className="d-flex gap-3 flex-column"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group row">
        <label htmlFor="id" className="col-sm-2 col-form-label">
          Id:
        </label>
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            value={user.id}
            {...register("id")}
            disabled
          />
        </div>
      </div>

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
            disabled={disabled}
            {...register("nome", { required: true })}
          />
          {errors.nome && (
            <span className="text-danger">Nome é obrigatório</span>
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
            autoComplete="username"
            id="login"
            placeholder="Login"
            disabled={disabled}
            {...register("login", { required: true })}
          />
          {errors.login && (
            <span className="text-danger">Login é obrigatório</span>
          )}
        </div>
      </div>

      {!disabled && (
        <div className="form-group row">
          <label htmlFor="senha" className="col-sm-2 col-form-label">
            Senha
          </label>
          <div className="col-10">
            <input
              type="password"
              className="form-control"
              id="senha"
              autoComplete="current-password"
              placeholder="Senha"
              {...register("senha", { required: true })}
            />
            {errors.senha && (
              <span className="text-danger">Senha é obrigatória</span>
            )}
          </div>
        </div>
      )}

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
            disabled={disabled}
            {...register("email")}
          />
        </div>
      </div>
      <div className="form-group row justify-content-end pt-4">{children}</div>
    </form>
  );
};

export default UserDataFrame;
