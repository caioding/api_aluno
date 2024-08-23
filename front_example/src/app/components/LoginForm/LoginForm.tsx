"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import loginStyle from "../../login/style/login.module.scss";
import { useEffect, useState } from "react";
import { UserResponseAPI } from "@/app/types/user";
import { useRouter } from "next/navigation";
import { StatesResponse } from "@/app/types/StateResponse";
import { useUserContext } from "@/app/hooks/user/useUserContext";
import { ModelUserLogin } from "@/app/user/user.model";
import { toast } from "react-toastify";

type Inputs = {
  login: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [response, setResponse] = useState<UserResponseAPI | null>(null);

  const router = useRouter();

  const [stateResponse, setStateResponse] = useState<StatesResponse>({
    isError: false,
    isLoading: false,
    errorMessage: undefined,
  });

  const userContext = useUserContext();
  useEffect(() => {
    if (response) {
      toast.success("Usuário Logou com sucesso!");

      userContext.setUser({
        id: response.id,
        nome: response.nome,
        login: response.login,
        email: response.email,
      });
      router.push("/");
    }
    if (stateResponse.isError && stateResponse.errorMessage) {
      toast.error(stateResponse.errorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateResponse.isError, stateResponse.errorMessage, response]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStateResponse((prevState) => ({
      ...prevState,
      isLoading: true,
      isError: false,
      errorMessage: undefined,
    }));

    const response = await ModelUserLogin(
      { login: data.login, password: data.password },
      setStateResponse
    );

    setResponse(response);
  };

  return (
    <form className="container px-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="my-2 row">
        <label htmlFor="login" className="form-label row fw-medium">
          Login
        </label>
        <input
          type="text"
          className="form-control border-1 border-black rounded-0"
          placeholder="Login"
          id="login"
          autoComplete="username"
          {...register("login", { required: true })}
        />
        {errors.login && (
          <span className="text-danger text-center mt-1">
            Login é obrigatório
          </span>
        )}
      </div>
      <div className="my-2 row">
        <label htmlFor="senha" className="form-label row fw-medium">
          Senha
        </label>
        <input
          type="password"
          className="form-control border-1 border-black rounded-0"
          placeholder="Senha"
          autoComplete="current-password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-danger text-center mt-1">
            Senha é obrigatória
          </span>
        )}
      </div>

      <div className="d-flex flex-column row py-4">
        <button
          className={`btn ${loginStyle.btnGreen} mb-3 rounded-0 fs-5 fw-bold text-light`}
          type="submit"
        >
          Entrar
        </button>
        <a
          className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover text-center fw-medium"
          href="/usuario"
        >
          Esqueceu sua senha?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
