import axios from "axios";
import { StatesResponse } from "@/app/types/StateResponse";
import { RequestResponseAPI } from "../types/requests";
import { listRequests } from "./requests.service";

const ModelRequestsList = async (
  setState: React.Dispatch<React.SetStateAction<StatesResponse>>
): Promise<RequestResponseAPI[] | null> => {
  try {
    setState({ isLoading: true, isError: false });
    const response = await listRequests();
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

export { ModelRequestsList };
