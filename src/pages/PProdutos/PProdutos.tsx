import { useNavigate } from "react-router-dom";
import { useDadosFarmacia } from "../../hooks/useDadosFarmacia";
import ListagemProdutos from "../../components/Produtos/ListagemProdutos";
export default function PProdutos() {
  const farmacia = useDadosFarmacia();
  const navigate = useNavigate();
  return (
    <ListagemProdutos
      produtos={farmacia.produtos}
      carregando={farmacia.carregando}
      ocupado={farmacia.ocupado}
      novo={() => navigate("/cadastro/produto")}
      editar={(p) => navigate("/atualizar/produto/" + p.idProduto)}
    />
  );
}
