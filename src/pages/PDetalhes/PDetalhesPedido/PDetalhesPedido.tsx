import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDadosFarmacia } from "../../../hooks/useDadosFarmacia";
import type { PedidoDetalheDTO } from "../../../fetch/PedidosRequest";
import { farmaciaRequest as api } from "../../../fetch/farmaciaRequest";
import PPedidos from "../../PPedidos/PPedidos";
import DetalhesPedido from "../../../components/Pedidos/DetalhesPedido";
export default function PDetalhesPedido() {
  const farmacia = useDadosFarmacia();
  const { idVenda } = useParams();
  const navigate = useNavigate();
  const [detalhe, setDetalhe] = useState<PedidoDetalheDTO | null>(null);
  const [mensagem, setMensagem] = useState("");
  useEffect(() => {
    let ativo = true;
    api<PedidoDetalheDTO>("/pedidos/" + idVenda)
      .then((d) => {
        if (ativo) setDetalhe(d);
      })
      .catch((e) => {
        if (ativo)
          setMensagem(
            e instanceof Error
              ? e.message
              : "Não foi possível carregar o pedido.",
          );
      });
    return () => {
      ativo = false;
    };
  }, [idVenda]);
  async function atualizarDetalhe() {
    setDetalhe(await api<PedidoDetalheDTO>("/pedidos/" + idVenda));
  }
  return (
    <>
      <PPedidos />
      {mensagem ? (
        <p role="alert">{mensagem}</p>
      ) : detalhe ? (
        <DetalhesPedido
          detalhe={detalhe}
          produtos={farmacia.produtos}
          ocupado={farmacia.ocupado}
          erro={farmacia.erro}
          aviso={farmacia.aviso}
          salvar={farmacia.salvar}
          atualizarDetalhe={atualizarDetalhe}
          fechar={() => navigate("/lista/pedido")}
        />
      ) : (
        <p role="status">Carregando pedido…</p>
      )}
    </>
  );
}
