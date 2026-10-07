export const dinheiro = (n: number) =>
  Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const data = (s?: string | null) =>
  s ? new Date(s.slice(0, 10) + "T12:00:00").toLocaleDateString("pt-BR") : "—";
