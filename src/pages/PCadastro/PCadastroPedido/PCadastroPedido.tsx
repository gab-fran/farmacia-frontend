import { useNavigate } from "react-router-dom";
import { useDadosFarmacia } from "../../../hooks/useDadosFarmacia";
import PPedidos from "../../PPedidos/PPedidos";
import FormularioPedido from "../../../components/Pedidos/FormularioPedido";
export default function PCadastroPedido() {
  const farmacia = useDadosFarmacia();
  const navigate = useNavigate();
  return (
    <>
      <PPedidos />
      <FormularioPedido
        produtos={farmacia.produtos}
        clientes={farmacia.clientes}
        falha={farmacia.falha}
        ocupado={farmacia.ocupado}
        erro={farmacia.erro}
        aviso={farmacia.aviso}
        salvar={farmacia.salvar}
        fechar={() => navigate("/lista/pedido")}
      />
    </>
  );
}
