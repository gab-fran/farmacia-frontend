import { SERVER_CFG } from "../AppConfig";
import { apiRequest } from "./apiRequest";

export function farmaciaRequest<T>(
  rota: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  return apiRequest<T>(SERVER_CFG.SERVER_URL + rota, {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
