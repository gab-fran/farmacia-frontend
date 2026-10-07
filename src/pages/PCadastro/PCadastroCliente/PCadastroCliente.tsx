import { useNavigate } from "react-router-dom";
import { useDadosFarmacia } from "../../../hooks/useDadosFarmacia";
import PClientes from "../../PClientes/PClientes";
import FormularioCliente from "../../../components/Clientes/FormularioCliente";
export default function PCadastroCliente() {
  const farmacia = useDadosFarmacia();
  const navigate = useNavigate();
  return (
    <>
      <PClientes />
      <FormularioCliente
        inicial={{ nome: "", cpf: "" }}
        ocupado={farmacia.ocupado}
        erro={farmacia.erro}
        aviso={farmacia.aviso}
        salvar={farmacia.salvar}
        fechar={() => navigate("/lista/cliente")}
      />
    </>
  );
}
