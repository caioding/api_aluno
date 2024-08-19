import {
  CreateUserAPI,
  CreateUserResponseAPI,
  DeleteUserResponseAPI,
  UpdateUserAPI,
  UpdateUserResponseAPI,
  UserLogin,
  UserResponseAPI,
} from "@/app/types/user";
import {
  createUser,
  listUsers,
  loginUser,
  searchUser,
  updateUser,
  userDelete,
  userDetail,
} from "./user.service";
import axios from "axios";
import { StatesResponse } from "@/app/types/StateResponse";

const ModelUserLogin = async (
  user: UserLogin | null,
  setState: React.Dispatch<React.SetStateAction<StatesResponse>>
): Promise<UserResponseAPI | null> => {
  if (!user) return null;
  try {
    setState({ isLoading: true, isError: false });
    const response = await loginUser(user);
    setState({ isLoading: false, isError: false });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      if (statusCode === 400) {
        setState({
          isLoading: false,
          isError: true,
          errorMessage: `codigo: ${statusCode} mensagem: "Credenciais invalidas!"`,
        });
      } else {
        setState({
          isLoading: false,
          isError: true,
          errorMessage: `codigo: ${statusCode} mensagem: ${error.message}`,
        });
      }
    }
    return null;
  }
};

const ModelUserList = async (
  setState: React.Dispatch<React.SetStateAction<StatesResponse>>
): Promise<UserResponseAPI[] | null> => {
  try {
    setState({ isLoading: true, isError: false });
    const response = await listUsers();
    setState({ isLoading: false, isError: false });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      setState({
        isLoading: false,
        isError: true,
        errorMessage: `codigo: ${statusCode} mensagem: ${error.message}`,
      });
    }
    return null;
  }
};

const ModelUserCreate = async (
  user: CreateUserAPI,
  setState: React.Dispatch<React.SetStateAction<StatesResponse>>
): Promise<CreateUserResponseAPI | null> => {
  try {
    setState({ isLoading: true, isError: false });
    const response = await createUser(user);
    setState({ isLoading: false, isError: false });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      setState({
        isLoading: false,
        isError: true,
        errorMessage: `codigo: ${statusCode} mensagem: ${error.message}`,
      });
    }
    return null;
  }
};

const ModelUserDetail = async (
  id: number,
  setState: React.Dispatch<React.SetStateAction<StatesResponse>>
): Promise<UserResponseAPI | null> => {
  try {
    setState({ isLoading: true, isError: false });
    const response = await userDetail(id);
    setState({ isLoading: false, isError: false });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      setState({
        isLoading: false,
        isError: true,
        errorMessage: `codigo: ${statusCode} mensagem: ${error.message}`,
      });
    }
    return null;
  }
};

const ModelUserDelete = async (
  id: number,
  setState: React.Dispatch<React.SetStateAction<StatesResponse>>
): Promise<DeleteUserResponseAPI | null> => {
  try {
    setState({ isLoading: true, isError: false });
    const response = await userDelete(id);
    setState({ isLoading: false, isError: false });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      setState({
        isLoading: false,
        isError: true,
        errorMessage: `codigo: ${statusCode} mensagem: ${error.message}`,
      });
    }
    return null;
  }
};

const ModelUserUpdate = async (
  user: UpdateUserAPI,
  setState: React.Dispatch<React.SetStateAction<StatesResponse>>
): Promise<UpdateUserResponseAPI | null> => {
  try {
    setState({ isLoading: true, isError: false });
    const response = await updateUser(user);
    setState({ isLoading: false, isError: false });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      setState({
        isLoading: false,
        isError: true,
        errorMessage: `codigo: ${statusCode} mensagem: ${error.message}`,
      });
    }
    return null;
  }
};

const ModelUserSearch = async (
  name: string,
  setState: React.Dispatch<React.SetStateAction<StatesResponse>>
): Promise<UserResponseAPI[] | null> => {
  try {
    setState({ isLoading: true, isError: false });
    const response = await searchUser(name);
    setState({ isLoading: false, isError: false });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      setState({
        isLoading: false,
        isError: true,
        errorMessage: `codigo: ${statusCode} mensagem: ${error.message}`,
      });
    }
    return null;
  }
};

export {
  ModelUserCreate,
  ModelUserList,
  ModelUserLogin,
  ModelUserDelete,
  ModelUserDetail,
  ModelUserUpdate,
  ModelUserSearch,
};
