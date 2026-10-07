import { useNavigate } from "react-router-dom";
import { useDadosFarmacia } from "../../hooks/useDadosFarmacia";
import ListagemPedidos from "../../components/Pedidos/ListagemPedidos";
export default function PPedidos() {
  const farmacia = useDadosFarmacia();
  const navigate = useNavigate();
  return (
    <ListagemPedidos
      pedidos={farmacia.pedidos}
      carregando={farmacia.carregando}
      ocupado={farmacia.ocupado}
      novo={() => navigate("/cadastro/pedido")}
      verPedido={async (id) => {
        navigate("/detalhes/pedido/" + id);
      }}
    />
  );
}
