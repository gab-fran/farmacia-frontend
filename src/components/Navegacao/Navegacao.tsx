import { Link } from "react-router-dom";
export type Pagina = "Produtos" | "Clientes" | "Pedidos";
const destinos: Record<Pagina, string> = {
  Produtos: "/lista/produto",
  Clientes: "/lista/cliente",
  Pedidos: "/lista/pedido",
};
export default function Navegacao({ aba }: { aba: Pagina }) {
  return (
    <aside>
      <Link className="marca" to="/">
        <img src="/pharmacyflow-logo.svg" alt="PharmacyFlow" />
      </Link>
      <p className="eyebrow">GESTÃO DA FARMÁCIA</p>
      <nav aria-label="Navegação principal">
        {(["Produtos", "Clientes", "Pedidos"] as const).map((pagina, i) => (
          <Link
            key={pagina}
            to={destinos[pagina]}
            className={aba === pagina ? "ativo" : ""}
            aria-current={aba === pagina ? "page" : undefined}
          >
            <span aria-hidden="true">{["▦", "♧", "▤"][i]}</span>
            {pagina}
          </Link>
        ))}
      </nav>
      <small className="aside-footer">Organização para o dia a dia</small>
    </aside>
  );
}
