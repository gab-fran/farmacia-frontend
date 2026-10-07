import type { ItemDTO, AtualizarItemPedidoDTO } from "../../dto/ItemPedidoDTO";
import Campo from "../Campo/Campo";
interface Props {
  item: ItemDTO & { descricao: string };
  ocupado: boolean;
  atualizar: (campos: AtualizarItemPedidoDTO) => Promise<void>;
  remover: () => Promise<void>;
}
export default function FormularioItemPedido({
  item,
  ocupado,
  atualizar,
  remover,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        void atualizar({
          qtdProduto: Number(f.get("qtd")),
          precoUnit: Number(f.get("preco")),
        });
      }}
    >
      <strong>{item.descricao}</strong>
      <div className="grid">
        <Campo titulo="Quantidade">
          <input
            required
            name="qtd"
            type="number"
            min="1"
            step="1"
            defaultValue={item.qtdProduto}
          />
        </Campo>
        <Campo titulo="Preço unitário (R$)">
          <input
            required
            name="preco"
            type="number"
            min="0"
            step=".01"
            defaultValue={Number(item.precoUnit)}
          />
        </Campo>
      </div>
      <div className="acoes">
        <button disabled={ocupado}>Salvar item</button>
        <button
          type="button"
          className="perigo"
          disabled={ocupado}
          onClick={() => {
            if (window.confirm("Remover " + item.descricao + " deste pedido?"))
              void remover();
          }}
        >
          Remover
        </button>
      </div>
    </form>
  );
}
