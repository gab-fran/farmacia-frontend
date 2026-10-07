import { useNavigate, useParams } from "react-router-dom";
import { useDadosFarmacia } from "../../../hooks/useDadosFarmacia";
import PProdutos from "../../PProdutos/PProdutos";
import FormularioProduto from "../../../components/Produtos/FormularioProduto";
export default function PAtualizarProduto() {
  const farmacia = useDadosFarmacia();
  const { idProduto } = useParams();
  const navigate = useNavigate();
  const produto = farmacia.produtos.find(
    (p) => p.idProduto === Number(idProduto),
  );
  return (
    <>
      <PProdutos />
      {farmacia.carregando ? (
        <p role="status">Carregando produto…</p>
      ) : produto ? (
        <FormularioProduto
          key={produto.idProduto}
          inicial={{
            ...produto,
            preco: Number(produto.preco),
            validade: produto.validade?.slice(0, 10) ?? "",
          }}
          ocupado={farmacia.ocupado}
          erro={farmacia.erro}
          aviso={farmacia.aviso}
          salvar={farmacia.salvar}
          fechar={() => navigate("/lista/produto")}
        />
      ) : (
        <p role="alert">Produto não encontrado ou indisponível.</p>
      )}
    </>
  );
}
