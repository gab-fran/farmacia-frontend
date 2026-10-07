import { SERVER_CFG } from "../AppConfig";
import type { ItemPedidoDTO, AtualizarItemPedidoDTO } from "../dto/ItemPedidoDTO";
import { apiRequest } from "./apiRequest";

export interface ItemPedidoDetalheDTO extends Pick<ItemPedidoDTO, "idProduto" | "qtdProduto" | "precoUnit"> {
    descricao: string;
}

class ItemPedidoRequests {
    private readonly url = `${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ITENS}`;

    obterItensPorVenda(idVenda: number): Promise<ItemPedidoDetalheDTO[]> {
        return apiRequest<ItemPedidoDetalheDTO[]>(`${this.url}/${idVenda}`);
    }

    cadastrarItem(item: ItemPedidoDTO): Promise<{ mensagem: string }> {
        return apiRequest<{ mensagem: string }>(this.url, {
            method: "POST",
            body: JSON.stringify(item)
        });
    }

    atualizarItem(idVenda: number, idProduto: number, campos: AtualizarItemPedidoDTO): Promise<{ mensagem: string }> {
        return apiRequest<{ mensagem: string }>(`${this.url}/${idVenda}/${idProduto}`, {
            method: "PUT",
            body: JSON.stringify(campos)
        });
    }

    removerItem(idVenda: number, idProduto: number): Promise<{ mensagem: string }> {
        return apiRequest<{ mensagem: string }>(`${this.url}/${idVenda}/${idProduto}`, {
            method: "DELETE"
        });
    }
}

export default new ItemPedidoRequests();