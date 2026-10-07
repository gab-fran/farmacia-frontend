import { useState } from "react";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
import Painel from "../Painel/Painel";
import { dinheiro, data } from "../../utils/formatacao";
interface Props {
  produtos: ProdutoDTO[];
  carregando: boolean;
  ocupado: boolean;
  novo: () => void;
  editar: (produto: ProdutoDTO) => void;
}
export default function ListagemProdutos({
  produtos,
  carregando,
  ocupado,
  novo,
  editar,
}: Props) {
  const [busca, setBusca] = useState("");
  const [alertas, setAlertas] = useState(false);
  const listaProdutos = produtos.filter(
    (p) =>
      p.descricao.toLowerCase().includes(busca.toLowerCase()) &&
      (!alertas || p.qtdEstoque <= p.qtdMinEstoque),
  );
  return (
    <Painel
      titulo="Lista de produtos"
      botao="Novo produto"
      ocupado={ocupado}
      carregando={carregando}
      busca={busca}
      setBusca={setBusca}
      novo={novo}
      vazio={!listaProdutos.length}
      colunas={[
        "Produto",
        "Preço",
        "Estoque / mínimo",
        "Validade",
        "Situação",
        "Ações",
      ]}
      filtro={
        <label className="check">
          <input
            type="checkbox"
            checked={alertas}
            onChange={(e) => setAlertas(e.target.checked)}
          />{" "}
          Apenas estoque em alerta
        </label>
      }
    >
      {listaProdutos.map((p) => (
        <tr key={p.idProduto}>
          <td>
            <strong>{p.descricao}</strong>
            <small>#{p.idProduto}</small>
          </td>
          <td>{dinheiro(p.preco)}</td>
          <td>
            {p.qtdEstoque} / {p.qtdMinEstoque}
          </td>
          <td>{data(p.validade)}</td>
          <td>
            <span
              className={`badge ${p.qtdEstoque <= p.qtdMinEstoque ? "baixo" : ""}`}
            >
              {p.qtdEstoque <= p.qtdMinEstoque ? "Repor estoque" : "Em estoque"}
            </span>
          </td>
          <td>
            <button className="link" onClick={() => editar(p)}>
              Editar
            </button>
          </td>
        </tr>
      ))}
    </Painel>
  );
}
