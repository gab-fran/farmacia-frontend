import { useNavigate } from "react-router-dom";
import { useDadosFarmacia } from "../../hooks/useDadosFarmacia";
import ListagemClientes from "../../components/Clientes/ListagemClientes";
export default function PClientes() {
  const farmacia = useDadosFarmacia();
  const navigate = useNavigate();
  return (
    <ListagemClientes
      clientes={farmacia.clientes}
      carregando={farmacia.carregando}
      ocupado={farmacia.ocupado}
      novo={() => navigate("/cadastro/cliente")}
    />
  );
}
