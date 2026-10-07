import { SERVER_CFG } from "../AppConfig";
import type { ProdutoDTO, AtualizarProdutoDTO } from "../dto/ProdutoDTO";
import { apiRequest } from "./apiRequest";

export interface ProdutoAlertaDTO extends Pick<ProdutoDTO, "idProduto" | "descricao" | "qtdEstoque" | "qtdMinEstoque"> {
    emAlerta: boolean;
}

class ProdutoRequests {
    private readonly url = `${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_PRODUTOS}`;

    obterListaDeProdutos(): Promise<ProdutoDTO[]> {
        return apiRequest<ProdutoDTO[]>(this.url);
    }

    obterAlertaDeProdutos(): Promise<ProdutoAlertaDTO[]> {
        return apiRequest<ProdutoAlertaDTO[]>(`${this.url}/alerta`);
    }

    async enviarFormularioProduto(formProduto: Omit<ProdutoDTO, "idProduto">): Promise<boolean> {
        try {
            await apiRequest<{ mensagem: string }>(this.url, {
                method: "POST",
                body: JSON.stringify(formProduto)
            });
            return true;
        } catch (error) {
            console.error(`Erro ao cadastrar produto. ${error}`);
            return false;
        }
    }

    async atualizarProduto(formProduto: AtualizarProdutoDTO): Promise<boolean> {
        if (formProduto.idProduto === undefined) {
            throw new Error("ID do produto não informado.");
        }

        const { idProduto, ...campos } = formProduto;
        await apiRequest<{ mensagem: string }>(`${this.url}/${idProduto}`, {
            method: "PUT",
            body: JSON.stringify(campos)
        });
        return true;
    }
}

export default new ProdutoRequests();