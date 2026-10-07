export interface ProdutoDTO {
    idProduto: number;
    descricao: string;
    preco: number;
    qtdEstoque: number;
    qtdMinEstoque: number;
    // No JSON da requisicao, a data e enviada como string (YYYY-MM-DD).
    validade?: string | null;
}

export type AtualizarProdutoDTO = Partial<ProdutoDTO>;
