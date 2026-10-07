import type { ItemDTO } from "./ItemPedidoDTO.js";

export interface PedidoDTO {
    idCliente: number;
    itens: ItemDTO[];
}
