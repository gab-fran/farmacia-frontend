import { SERVER_CFG } from "../AppConfig";
import type { PedidoDTO } from "../dto/PedidoDTO";
import type { ItemDTO } from "../dto/ItemPedidoDTO";
import { apiRequest } from "./apiRequest";

export interface PedidoListaDTO {
    idVenda: number;
    idCliente: number;
    dataVenda: string;
    nomeCliente: string;
}

export interface PedidoDetalheDTO {
    pedido: PedidoListaDTO;
    itens: Array<ItemDTO & { descricao: string }>;
}

export interface PedidoCriadoDTO {
    idVenda: number;
    mensagem: string;
    totalItens: number;
}

class PedidoRequests {
    private readonly url = `${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_PEDIDOS}`;

    obterListaDePedidos(): Promise<PedidoListaDTO[]> {
        return apiRequest<PedidoListaDTO[]>(this.url);
    }

    obterPedidoPorId(idVenda: number): Promise<PedidoDetalheDTO> {
        return apiRequest<PedidoDetalheDTO>(`${this.url}/${idVenda}`);
    }

    // Mantém compatibilidade com a grafia usada anteriormente.
    obterPedidosPiorId(idVenda: number): Promise<PedidoDetalheDTO> {
        return this.obterPedidoPorId(idVenda);
    }

    criarPedido(formPedido: PedidoDTO): Promise<PedidoCriadoDTO> {
        return apiRequest<PedidoCriadoDTO>(this.url, {
            method: "POST",
            body: JSON.stringify(formPedido)
        });
    }

    async enviarFormularioPedido(formPedido: PedidoDTO): Promise<boolean> {
        try {
            await this.criarPedido(formPedido);
            return true;
        } catch (error) {
            console.error(`Erro ao criar pedido. ${error}`);
            return false;
        }
    }

    obterItensDoPedido(idVenda: number): Promise<Array<ItemDTO & { descricao: string }>> {
        return apiRequest<Array<ItemDTO & { descricao: string }>>(`${this.url}/${idVenda}/itens`);
    }

    adicionarItemAoPedido(idVenda: number, item: ItemDTO): Promise<{ mensagem: string }> {
        return apiRequest<{ mensagem: string }>(`${this.url}/${idVenda}/itens`, {
            method: "POST",
            body: JSON.stringify(item)
        });
    }
}

export default new PedidoRequests();