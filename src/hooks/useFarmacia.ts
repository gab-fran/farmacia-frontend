import { useEffect, useState } from "react";
import type { ProdutoDTO } from "../dto/ProdutoDTO";
import type { ClienteDTO } from "../dto/ClienteDTO";
import type { PedidoListaDTO } from "../fetch/PedidosRequest";
import { farmaciaRequest as api } from "../fetch/farmaciaRequest";

export function useFarmacia() {
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const [clientes, setClientes] = useState<ClienteDTO[]>([]);
  const [pedidos, setPedidos] = useState<PedidoListaDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState("");
  const [erro, setErro] = useState(false);

  function falha(e: unknown) {
    setErro(true);
    setAviso(
      e instanceof TypeError
        ? "Não foi possível conectar ao servidor. Verifique se o backend está em execução."
        : e instanceof Error
          ? e.message
          : "Não foi possível concluir a operação.",
    );
  }
  async function carregar() {
    setCarregando(true);
    try {
      const [p, c, v] = await Promise.all([
        api<ProdutoDTO[]>("/produtos"),
        api<ClienteDTO[]>("/clientes"),
        api<PedidoListaDTO[]>("/pedidos"),
      ]);
      setProdutos(p ?? []);
      setClientes(c ?? []);
      setPedidos(v ?? []);
    } finally {
      setCarregando(false);
    }
  }
  useEffect(() => {
    let ativo = true;
    Promise.all([
      api<ProdutoDTO[]>("/produtos"),
      api<ClienteDTO[]>("/clientes"),
      api<PedidoListaDTO[]>("/pedidos"),
    ])
      .then(([p, c, v]) => {
        if (ativo) {
          setProdutos(p ?? []);
          setClientes(c ?? []);
          setPedidos(v ?? []);
        }
      })
      .catch((e) => {
        if (ativo) falha(e);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, []);
  async function salvar(acao: () => Promise<void>) {
    setOcupado(true);
    setAviso("");
    try {
      await acao();
      setErro(false);
      setAviso("Operação realizada com sucesso.");
      try {
        await carregar();
      } catch {
        falha(
          new Error(
            "Dados salvos, mas a lista não pôde ser atualizada. Clique em Atualizar.",
          ),
        );
      }
    } catch (e) {
      falha(e);
    } finally {
      setOcupado(false);
    }
  }

  return {
    produtos,
    clientes,
    pedidos,
    carregando,
    ocupado,
    aviso,
    erro,
    setAviso,
    carregar,
    salvar,
    falha,
    setOcupado,
  };
}
export type Farmacia = ReturnType<typeof useFarmacia>;
