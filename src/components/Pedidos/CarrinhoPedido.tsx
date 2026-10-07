import type { ItemDTO } from "../../dto/ItemPedidoDTO";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
import { dinheiro } from "../../utils/formatacao";
import TotalPedido from "./TotalPedido";
interface Props {
  itens: ItemDTO[];
  produtos: ProdutoDTO[];
  remover: (id: number) => void;
}
export default function CarrinhoPedido({ itens, produtos, remover }: Props) {
  return (
    <>
      <div className="itens">
        {itens.map((i) => (
          <div key={i.idProduto}>
            <span>
              {produtos.find((p) => p.idProduto === i.idProduto)?.descricao}
              <small>
                {i.qtdProduto} × {dinheiro(i.precoUnit)}
              </small>
            </span>
            <strong>{dinheiro(i.qtdProduto * i.precoUnit)}</strong>
            <button
              type="button"
              className="link"
              onClick={() => remover(i.idProduto)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <TotalPedido itens={itens} />
    </>
  );
}
