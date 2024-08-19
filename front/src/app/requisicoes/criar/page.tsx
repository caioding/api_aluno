"use client";

import { RequestResponseAPI } from "@/app/types/requests";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const Criar = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RequestResponseAPI>();
  const reqparam = useSearchParams();
  const param = reqparam.get("countRequest");

  const getDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const numRequisicao = parseInt(param!) + 1;

  const onSubmit = (data: RequestResponseAPI) => {
    console.log(data);
  };

  return (
    <fieldset className="border py-2 px-4 m-2 rounded-4 ">
      <title>Nova Requisição</title>
      <legend className="float-none w-auto">Criação de Nova Requisição</legend>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column w-100"
      >
        <div className="row mb-3">
          <div className="col-8 row p-0 m-0">
            <label
              htmlFor="numRequisicao"
              className="col-3 col-form-label px-0"
            >
              Número da Requisição:
            </label>
            <div className="col-2 p-0">
              <input
                className="form-control text-center"
                type="text"
                id="numRequisicao"
                value={numRequisicao}
                disabled
              />
            </div>
          </div>

          <div className="col-4 row p-0 m-0 justify-content-end">
            <label htmlFor="data" className="col-2 col-form-label px-0">
              Data:
            </label>
            <div className="col-6 p-0">
              <input
                className="form-control text-center"
                type="text"
                id="data"
                value={getDate()}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="nomeSolicitante"
            className="col-2 col-form-label px-0"
          >
            Nome do Solicitante:
          </label>
          <div className="col-10 p-0">
            <input
              {...register("nome_solicitante", { required: true })}
              type="text"
              id="nomeSolicitante"
              name="nome_solicitante"
              className="form-control"
            />
            {errors.nome_solicitante && (
              <small className="fw-medium text-danger">
                Nome do solicitante é obrigatório
              </small>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="nomeSistema" className="col-2 col-form-label px-0">
            Nome do Sistema:
          </label>
          <div className="col-10 p-0">
            <input
              {...register("nome_sistema", { required: true })}
              type="text"
              id="nomeSistema"
              name="nome_sistema"
              className="form-control"
            />
            {errors.nome_sistema && (
              <small className="fw-medium text-danger">
                Nome do sistema é obrigatório
              </small>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="DescRequisicao" className="col-2 col-form-label px-0">
            Descrição da Requisição de Alteração:
          </label>
          <div className="col-10 p-0">
            <textarea
              {...register("descricao_requisicao", { required: true })}
              id="DescRequisicao"
              name="descricao_requisicao"
              className="form-control"
              rows={4}
              maxLength={500}
            ></textarea>
            {errors.descricao_requisicao && (
              <small className="fw-medium text-danger">
                É obrigatório ter uma descrição
              </small>
            )}
            <small
              className={`text${
                watch("descricao_requisicao")?.length != 500
                  ? "-success"
                  : "-danger fw-medium"
              } `}
            >
              <span> {watch("descricao_requisicao")?.length || 0}</span>
              /500 caracteres
            </small>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="status" className="col-2 col-form-label px-0">
            Status da Requisição:
          </label>
          <div className="col-2 p-0">
            <input name="status_requisicao" hidden />
            <input
              type="text"
              id="status"
              name="status_requisicao"
              className="form-control text-center"
              disabled
              value="Criada"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="anexo" className="col-2 col-form-label px-0">
            Anexo:
          </label>
          <div className="col-10 p-0">
            <input
              {...register("anexo")}
              type="file"
              id="anexo"
              name="anexo"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="dataFechamento" className="col-2 col-form-label px-0">
            Data Fechamento:
          </label>
          <div className="col-2 p-0">
            <input
              type="text"
              id="dataFechamento"
              name="fechamento"
              className="form-control text-center"
              disabled
              value="A determinar"
            />
          </div>
        </div>

        <div className="row mt-2 justify-content-end">
          <button
            type="submit"
            className="btn btn-outline-success col-2 fw-bolder"
          >
            Enviar
          </button>
        </div>
      </form>
    </fieldset>
  );
};

export default Criar;
