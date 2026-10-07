import { useState } from "react";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
import type { ItemDTO } from "../../dto/ItemPedidoDTO";
import Campo from "../Campo/Campo";
import { dinheiro } from "../../utils/formatacao";
export default function AdicionarProduto({
  produtos,
  adicionar,
  ocupado,
}: {
  produtos: ProdutoDTO[];
  adicionar: (item: ItemDTO) => Promise<void>;
  ocupado: boolean;
}) {
  const [id, setId] = useState("");
  const [qtd, setQtd] = useState(1);
  const p = produtos.find((p) => p.idProduto === Number(id));
  return (
    <form
      className="adicionar"
      onSubmit={(e) => {
        e.preventDefault();
        if (p)
          void adicionar({
            idProduto: p.idProduto,
            qtdProduto: qtd,
            precoUnit: Number(p.preco),
          });
      }}
    >
      <Campo titulo="Produto">
        <select required value={id} onChange={(e) => setId(e.target.value)}>
          <option value="">Selecione um produto</option>
          {produtos
            .filter((p) => p.qtdEstoque > 0)
            .map((p) => (
              <option key={p.idProduto} value={p.idProduto}>
                {p.descricao} · {dinheiro(p.preco)} · {p.qtdEstoque} disponíveis
              </option>
            ))}
        </select>
      </Campo>
      <div className="grid">
        <Campo titulo="Quantidade">
          <input
            type="number"
            required
            min="1"
            max={p?.qtdEstoque}
            step="1"
            value={qtd}
            onChange={(e) => setQtd(Number(e.target.value))}
          />
        </Campo>
        <button className="secundario" disabled={ocupado || !p}>
          Adicionar produto
        </button>
      </div>
    </form>
  );
}
