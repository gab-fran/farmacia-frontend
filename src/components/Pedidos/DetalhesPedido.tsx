import type { Farmacia } from "../../hooks/useFarmacia";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
import type { PedidoDetalheDTO } from "../../fetch/PedidosRequest";
import { farmaciaRequest as api } from "../../fetch/farmaciaRequest";
import { data } from "../../utils/formatacao";
import Modal from "../Modal/Modal";
import AdicionarProduto from "../AdicionarProduto/AdicionarProduto";
import TotalPedido from "./TotalPedido";
import FormularioItemPedido from "./FormularioItemPedido";
interface Props {
  detalhe: PedidoDetalheDTO;
  produtos: ProdutoDTO[];
  ocupado: boolean;
  erro: boolean;
  aviso: string;
  salvar: Farmacia["salvar"];
  atualizarDetalhe: () => Promise<void>;
  fechar: () => void;
}
export default function DetalhesPedido({
  detalhe,
  produtos,
  ocupado,
  erro,
  aviso,
  salvar,
  atualizarDetalhe,
  fechar,
}: Props) {
  const idVenda = detalhe.pedido.idVenda;
  return (
    <Modal
      titulo={`Pedido #${idVenda}`}
      ocupado={ocupado}
      mensagem={erro ? aviso : undefined}
      fechar={fechar}
    >
      <p>
        {detalhe.pedido.nomeCliente} · {data(detalhe.pedido.dataVenda)}
      </p>
      <p className="ajuda">
        Altere a quantidade e o preço ou remova itens da venda.
      </p>
      <div className="itens">
        {detalhe.itens.map((item) => (
          <FormularioItemPedido
            key={`${item.idProduto}-${item.qtdProduto}-${item.precoUnit}`}
            item={item}
            ocupado={ocupado}
            atualizar={(campos) =>
              salvar(async () => {
                await api(`/itens/${idVenda}/${item.idProduto}`, "PUT", campos);
                await atualizarDetalhe();
              })
            }
            remover={() =>
              salvar(async () => {
                await api(`/itens/${idVenda}/${item.idProduto}`, "DELETE");
                await atualizarDetalhe();
              })
            }
          />
        ))}
      </div>
      {!detalhe.itens.length && (
        <p className="ajuda">Este pedido não possui itens.</p>
      )}
      <TotalPedido itens={detalhe.itens} />
      <AdicionarProduto
        produtos={produtos}
        ocupado={ocupado}
        adicionar={(item) =>
          salvar(async () => {
            await api(`/pedidos/${idVenda}/itens`, "POST", item);
            await atualizarDetalhe();
          })
        }
      />
    </Modal>
  );
}
