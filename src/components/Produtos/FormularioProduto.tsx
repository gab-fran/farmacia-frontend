import { useState } from "react";
import type { Farmacia } from "../../hooks/useFarmacia";
import { farmaciaRequest as api } from "../../fetch/farmaciaRequest";
import Campo from "../Campo/Campo";
import Modal from "../Modal/Modal";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
interface Props {
  inicial: Partial<ProdutoDTO>;
  ocupado: boolean;
  erro: boolean;
  aviso: string;
  salvar: Farmacia["salvar"];
  fechar: () => void;
}
export default function FormularioProduto({
  inicial,
  ocupado,
  erro,
  aviso,
  salvar,
  fechar,
}: Props) {
  const [produto, setProduto] = useState(inicial);
  return (
    <Modal
      titulo={produto.idProduto ? "Editar produto" : "Novo produto"}
      ocupado={ocupado}
      mensagem={erro ? aviso : undefined}
      fechar={fechar}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void salvar(async () => {
            await api(
              produto.idProduto
                ? `/produtos/${produto.idProduto}`
                : "/produtos",
              produto.idProduto ? "PUT" : "POST",
              {
                ...produto,
                descricao: produto.descricao?.trim(),
                validade: produto.validade || null,
              },
            );
            fechar();
          });
        }}
      >
        <Campo titulo="Nome do produto">
          <input
            required
            pattern=".*\S.*"
            maxLength={200}
            value={produto.descricao}
            onChange={(e) =>
              setProduto({ ...produto, descricao: e.target.value })
            }
          />
        </Campo>
        <div className="grid">
          {(["preco", "qtdEstoque", "qtdMinEstoque"] as const).map(
            (chave, i) => (
              <Campo
                titulo={
                  ["Preço (R$)", "Quantidade em estoque", "Estoque mínimo"][i]
                }
                key={chave}
              >
                <input
                  type="number"
                  required
                  min="0"
                  step={chave === "preco" ? ".01" : "1"}
                  value={produto[chave]}
                  onChange={(e) =>
                    setProduto({
                      ...produto,
                      [chave]: Number(e.target.value),
                    })
                  }
                />
              </Campo>
            ),
          )}
          <Campo titulo="Validade (opcional)">
            <input
              type="date"
              value={produto.validade ?? ""}
              onChange={(e) =>
                setProduto({ ...produto, validade: e.target.value })
              }
            />
          </Campo>
        </div>
        <button disabled={ocupado}>
          {ocupado ? "Salvando…" : "Salvar produto"}
        </button>
      </form>
    </Modal>
  );
}
