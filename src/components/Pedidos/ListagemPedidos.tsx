import { useState } from "react";
import type { PedidoListaDTO } from "../../fetch/PedidosRequest";
import Painel from "../Painel/Painel";
import { data } from "../../utils/formatacao";
interface Props {
  pedidos: PedidoListaDTO[];
  carregando: boolean;
  ocupado: boolean;
  novo: () => void;
  verPedido: (id: number) => Promise<void>;
}
export default function ListagemPedidos({
  pedidos,
  carregando,
  ocupado,
  novo,
  verPedido,
}: Props) {
  const [busca, setBusca] = useState("");
  const listaPedidos = pedidos.filter((p) =>
    (p.nomeCliente + " " + p.idVenda)
      .toLowerCase()
      .includes(busca.toLowerCase()),
  );
  return (
    <Painel
      titulo="Histórico de pedidos"
      botao="Novo pedido"
      ocupado={ocupado}
      carregando={carregando}
      busca={busca}
      setBusca={setBusca}
      novo={novo}
      vazio={!listaPedidos.length}
      colunas={["Pedido", "Cliente", "Data", "Ações"]}
    >
      {listaPedidos.map((p) => (
        <tr key={p.idVenda}>
          <td>
            <strong>#{p.idVenda}</strong>
          </td>
          <td>{p.nomeCliente}</td>
          <td>{data(p.dataVenda)}</td>
          <td>
            <button
              className="link"
              disabled={ocupado}
              onClick={() => verPedido(p.idVenda)}
            >
              Ver itens →
            </button>
          </td>
        </tr>
      ))}
    </Painel>
  );
}
