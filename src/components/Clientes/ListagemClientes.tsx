import { useState } from "react";
import type { ClienteDTO } from "../../dto/ClienteDTO";
import Painel from "../Painel/Painel";

interface Props {
  clientes: ClienteDTO[];
  carregando: boolean;
  ocupado: boolean;
  novo: () => void;
}
export default function ListagemClientes({
  clientes,
  carregando,
  ocupado,
  novo,
}: Props) {
  const [busca, setBusca] = useState("");

  const listaClientes = clientes.filter((c) =>
    `${c.nome} ${c.cpf}`.toLowerCase().includes(busca.toLowerCase()),
  );
  return (
    <Painel
      titulo="Seus clientes"
      botao="Novo cliente"
      ocupado={ocupado}
      carregando={carregando}
      busca={busca}
      setBusca={setBusca}
      novo={novo}
      vazio={!listaClientes.length}
      colunas={["Código", "Nome", "CPF"]}
    >
      {listaClientes.map((c) => (
        <tr key={c.idCliente}>
          <td>#{c.idCliente}</td>
          <td>
            <strong>{c.nome}</strong>
          </td>
          <td>{c.cpf}</td>
        </tr>
      ))}
    </Painel>
  );
}
