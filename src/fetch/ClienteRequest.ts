import { SERVER_CFG } from "../AppConfig";
import type { ClienteDTO } from "../dto/ClienteDTO";
import { apiRequest } from "./apiRequest";

class ClienteRequests {
    private readonly url = `${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_CLIENTES}`;

    obterListaDeClientes(): Promise<ClienteDTO[]> {
        return apiRequest<ClienteDTO[]>(this.url);
    }

    async enviarFormularioCliente(formCliente: Pick<ClienteDTO, "nome" | "cpf">): Promise<boolean> {
        try {
            await apiRequest<{ mensagem: string }>(this.url, {
                method: "POST",
                body: JSON.stringify(formCliente)
            });
            return true;
        } catch (error) {
            console.error(`Erro ao cadastrar cliente. ${error}`);
            return false;
        }
    }
}

export default new ClienteRequests();
