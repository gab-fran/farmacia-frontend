import type { ItemDTO } from "../../dto/ItemPedidoDTO";
import { dinheiro } from "../../utils/formatacao";
export default function TotalPedido({ itens }: { itens: ItemDTO[] }) {
  return (
    <p className="total">
      Total{" "}
      <strong>
        {dinheiro(
          itens.reduce((s, i) => s + i.qtdProduto * Number(i.precoUnit), 0),
        )}
      </strong>
    </p>
  );
}
