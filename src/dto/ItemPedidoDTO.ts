export interface ItemDTO {
    idProduto: number;
    qtdProduto: number;
    precoUnit: number;
}

export interface ItemPedidoDTO extends ItemDTO {
    idVenda: number;
}

export type AtualizarItemPedidoDTO = Partial<Pick<ItemDTO, "qtdProduto" | "precoUnit">>;
