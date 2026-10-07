import { useNavigate } from "react-router-dom";
import { useDadosFarmacia } from "../../../hooks/useDadosFarmacia";
import PProdutos from "../../PProdutos/PProdutos";
import FormularioProduto from "../../../components/Produtos/FormularioProduto";
export default function PCadastroProduto() {
  const farmacia = useDadosFarmacia();
  const navigate = useNavigate();
  return (
    <>
      <PProdutos />
      <FormularioProduto
        inicial={{
          descricao: "",
          preco: 0,
          qtdEstoque: 0,
          qtdMinEstoque: 0,
          validade: "",
        }}
        ocupado={farmacia.ocupado}
        erro={farmacia.erro}
        aviso={farmacia.aviso}
        salvar={farmacia.salvar}
        fechar={() => navigate("/lista/produto")}
      />
    </>
  );
}
