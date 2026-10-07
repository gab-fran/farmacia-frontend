import { useState } from "react";
import type { Farmacia } from "../../hooks/useFarmacia";
import { farmaciaRequest as api } from "../../fetch/farmaciaRequest";
import Campo from "../Campo/Campo";
import Modal from "../Modal/Modal";
import type { ClienteDTO } from "../../dto/ClienteDTO";
interface Props {
  inicial: Pick<ClienteDTO, "nome" | "cpf">;
  ocupado: boolean;
  erro: boolean;
  aviso: string;
  salvar: Farmacia["salvar"];
  fechar: () => void;
}
export default function FormularioCliente({
  inicial,
  ocupado,
  erro,
  aviso,
  salvar,
  fechar,
}: Props) {
  const [cliente, setCliente] = useState(inicial);
  return (
    <Modal
      titulo="Novo cliente"
      ocupado={ocupado}
      mensagem={erro ? aviso : undefined}
      fechar={fechar}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void salvar(async () => {
            await api("/clientes", "POST", {
              nome: cliente.nome.trim(),
              cpf: cliente.cpf,
            });
            fechar();
          });
        }}
      >
        <Campo titulo="Nome completo">
          <input
            required
            pattern=".*\S.*"
            maxLength={200}
            value={cliente.nome}
            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
          />
        </Campo>
        <Campo titulo="CPF (11 dígitos)">
          <input
            required
            pattern="[0-9]{11}"
            inputMode="numeric"
            maxLength={11}
            value={cliente.cpf}
            onChange={(e) =>
              setCliente({
                ...cliente,
                cpf: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </Campo>
        <button disabled={ocupado}>
          {ocupado ? "Salvando…" : "Cadastrar cliente"}
        </button>
      </form>
    </Modal>
  );
}
