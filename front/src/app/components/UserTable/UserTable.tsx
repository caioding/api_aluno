"use client";

import { StatesResponse } from "@/app/types/StateResponse";
import { ModelUserList, ModelUserSearch } from "@/app/user/user.model";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataTable, { TableColumn } from "react-data-table-component";
import "./table.scss";
import { useUsersFetchContext } from "@/app/hooks/fetch/useUsersFetchContext";
import { UserResponseAPI } from "@/app/types/user";
import TableUserOptions from "../TableUserOptions/TableUserOptions";

type DataRow = {
  name: string;
  login: string;
  email: string;
  actions: React.ReactNode;
};

type ReqTypes = {
  tipoReq: "login" | "todos" | "nome";
  busca: string;
};

type UserTableProps = {
  reqTypes: ReqTypes | null;
};

const UserTable = ({ reqTypes }: UserTableProps) => {
  const [stateResponse, setStateResponse] = useState<StatesResponse>({
    isError: false,
    isLoading: false,
    errorMessage: undefined,
  });

  const usersFetchContext = useUsersFetchContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response: UserResponseAPI[] | null;
        if (reqTypes?.tipoReq == "login" || reqTypes?.tipoReq == "nome") {
          response = await ModelUserSearch(reqTypes.busca, setStateResponse);
        } else {
          response = await ModelUserList(setStateResponse);
        }

        usersFetchContext.setUserFetch(response);
      } catch (err) {
        console.log(err);
      }
    };

    if (reqTypes) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqTypes]);

  useEffect(() => {
    if (stateResponse.isError) {
      toast.error(stateResponse.errorMessage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateResponse.isError]);

  const columns: TableColumn<DataRow>[] = [
    {
      name: "Nome",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Login",
      selector: (row) => row.login,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row) => row.actions,
      sortable: false,
      center: true,
      style: { justifyContent: "center" },
    },
  ];
  const data =
    usersFetchContext.usersFetch?.map((user) => {
      return {
        name: user.nome || "string",
        login: user.login || "string",
        email: user.email || "string",
        actions: <TableUserOptions id={user.id} name={user.nome} />,
      };
    }) || [];

  const paginationComponentOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const CustomNoDataComponent = () => (
    <div style={{ padding: "24px", textAlign: "center" }}>
      Nenhum dado disponível para exibir.
    </div>
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      fixedHeaderScrollHeight="300px"
      pagination
      responsive
      subHeaderWrap
      progressPending={stateResponse.isLoading}
      paginationComponentOptions={paginationComponentOptions}
      paginationPerPage={7}
      striped
      noDataComponent={<CustomNoDataComponent />}
    />
  );
};

export default UserTable;
