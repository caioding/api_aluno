import mockapi from "../service/mockapi";
import { RequestResponseAPI } from "../types/requests";

const listRequests = async (): Promise<RequestResponseAPI[]> => {
  try {
    const response = await mockapi.get("/requisicoes");
    return response.data;
  } catch (err) {
    throw err;
  }
};

export { listRequests };
