import { Outlet, useLocation } from "react-router-dom";
import Navegacao from "../../components/Navegacao/Navegacao";
import type { Pagina } from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import Resumo from "../../components/Resumo/Resumo";
import Aviso from "../../components/Aviso/Aviso";
import { useFarmacia } from "../../hooks/useFarmacia";

const descricoes = {
  Produtos: "Acompanhe o estoque e mantenha seus produtos em dia.",
  Clientes: "Cadastre e encontre seus clientes com facilidade.",
  Pedidos: "Registre vendas e consulte os itens de cada pedido.",
};
export default function LayoutFarmacia() {
  const { pathname } = useLocation();
  const aba: Pagina = pathname.includes("cliente")
    ? "Clientes"
    : pathname.includes("pedido")
      ? "Pedidos"
      : "Produtos";
  const farmacia = useFarmacia();
  return (
    <div className="app">
      <Navegacao aba={aba} />
      <main>
        <div className="topbar">
          Painel de gestão <b>MF</b>
        </div>
        <div className="conteudo">
          <div className="titulo">
            <div>
              <p className="eyebrow">SUA FARMÁCIA, ORGANIZADA</p>
              <h1>{aba}</h1>
              <p>{descricoes[aba]}</p>
            </div>
            <button
              className="secundario"
              disabled={farmacia.carregando || farmacia.ocupado}
              onClick={() => {
                farmacia.setAviso("");
                void farmacia.carregar().catch(farmacia.falha);
              }}
            >
              ↻ Atualizar
            </button>
          </div>
          <Aviso
            mensagem={farmacia.aviso}
            erro={farmacia.erro}
            fechar={() => farmacia.setAviso("")}
          />
          <Resumo {...farmacia} />
          <Outlet context={farmacia} />
          <Rodape />
        </div>
      </main>
    </div>
  );
}
