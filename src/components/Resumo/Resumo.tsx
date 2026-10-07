import type { Farmacia } from "../../hooks/useFarmacia";
export default function Resumo({
  produtos,
  clientes,
  pedidos,
  carregando,
}: Pick<Farmacia, "produtos" | "clientes" | "pedidos" | "carregando">) {
  const baixos = produtos.filter((p) => p.qtdEstoque <= p.qtdMinEstoque);
  return (
    <div className="resumo">
      {[
        ["Produtos cadastrados", produtos.length],
        ["Clientes cadastrados", clientes.length],
        ["Pedidos registrados", pedidos.length],
        ["Estoque em alerta", baixos.length],
      ].map(([nome, n], i) => (
        <div className="stat" key={nome}>
          <span aria-hidden="true">{["▦", "♧", "▤", "!"][i]}</span>
          <div>
            <p>{nome}</p>
            <strong>{carregando ? "…" : n}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
