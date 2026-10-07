import { useState } from "react";
import type { Farmacia } from "../../hooks/useFarmacia";
import { farmaciaRequest as api } from "../../fetch/farmaciaRequest";
import Campo from "../Campo/Campo";
import Modal from "../Modal/Modal";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
import type { ClienteDTO } from "../../dto/ClienteDTO";
import type { ItemDTO } from "../../dto/ItemPedidoDTO";
import Adicionar from "../AdicionarProduto/AdicionarProduto";
import CarrinhoPedido from "./CarrinhoPedido";
interface Props {
  produtos: ProdutoDTO[];
  clientes: ClienteDTO[];
  ocupado: boolean;
  erro: boolean;
  aviso: string;
  salvar: Farmacia["salvar"];
  falha: Farmacia["falha"];
  fechar: () => void;
}
export default function FormularioPedido({
  produtos,
  clientes,
  ocupado,
  erro,
  aviso,
  salvar,
  falha,
  fechar,
}: Props) {
  const [clienteId, setClienteId] = useState("");
  const [carrinho, setCarrinho] = useState<ItemDTO[]>([]);
  return (
    <Modal
      titulo="Novo pedido"
      ocupado={ocupado}
      mensagem={erro ? aviso : undefined}
      fechar={fechar}
    >
      <Campo titulo="Cliente">
        <select
          required
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((c) => (
            <option key={c.idCliente} value={c.idCliente}>
              {c.nome}
            </option>
          ))}
        </select>
      </Campo>
      <p className="ajuda">
        Cadastre o cliente e os produtos antes de registrar uma venda.
      </p>
      <Adicionar
        produtos={produtos}
        ocupado={ocupado}
        adicionar={async (item) => {
          const existente = carrinho.find(
            (i) => i.idProduto === item.idProduto,
          );
          const p = produtos.find((p) => p.idProduto === item.idProduto)!;
          if ((existente?.qtdProduto ?? 0) + item.qtdProduto > p.qtdEstoque) {
            falha(new Error("Quantidade superior ao estoque disponível."));
            return;
          }
          setCarrinho(
            existente
              ? carrinho.map((i) =>
                  i.idProduto === item.idProduto
                    ? { ...i, qtdProduto: i.qtdProduto + item.qtdProduto }
                    : i,
                )
              : [...carrinho, item],
          );
        }}
      />
      <CarrinhoPedido
        itens={carrinho}
        produtos={produtos}
        remover={(id) =>
          setCarrinho(carrinho.filter((i) => i.idProduto !== id))
        }
      />

      <button
        disabled={ocupado || !clienteId || !carrinho.length}
        onClick={() =>
          salvar(async () => {
            await api("/pedidos", "POST", {
              idCliente: Number(clienteId),
              itens: carrinho,
            });
            fechar();
          })
        }
      >
        {ocupado ? "Registrando…" : "Registrar pedido"}
      </button>
    </Modal>
  );
}
