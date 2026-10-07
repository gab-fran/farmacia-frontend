import type { ReactNode } from "react";
interface Props {
  titulo: string;
  botao: string;
  ocupado: boolean;
  carregando: boolean;
  busca: string;
  setBusca: (busca: string) => void;
  novo: () => void;
  vazio: boolean;
  colunas: string[];
  filtro?: ReactNode;
  children: ReactNode;
}
export default function Painel({
  titulo,
  botao,
  ocupado,
  carregando,
  busca,
  setBusca,
  novo,
  vazio,
  colunas,
  filtro,
  children,
}: Props) {
  return (
    <section className="painel">
      <header>
        <h2>{titulo}</h2>
        <button disabled={carregando || ocupado} onClick={novo}>
          + {botao}
        </button>
      </header>
      <div className="filtros">
        <input
          aria-label="Buscar registros"
          placeholder="Buscar por nome ou código…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {filtro}
      </div>
      {carregando ? (
        <p className="vazio" role="status">
          Carregando registros…
        </p>
      ) : (
        <div className="tabela">
          <table>
            <thead>
              <tr>
                {colunas.map((coluna) => (
                  <th key={coluna}>{coluna}</th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
          {vazio && <p className="vazio">Nenhum registro encontrado.</p>}
        </div>
      )}
    </section>
  );
}
