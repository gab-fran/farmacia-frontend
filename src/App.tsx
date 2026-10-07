import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutFarmacia from "./pages/LayoutFarmacia/LayoutFarmacia";
import PHome from "./pages/PHome/PHome";
import PProdutos from "./pages/PProdutos/PProdutos";
import PClientes from "./pages/PClientes/PClientes";
import PPedidos from "./pages/PPedidos/PPedidos";
import PCadastroProduto from "./pages/PCadastro/PCadastroProduto/PCadastroProduto";
import PCadastroCliente from "./pages/PCadastro/PCadastroCliente/PCadastroCliente";
import PCadastroPedido from "./pages/PCadastro/PCadastroPedido/PCadastroPedido";
import PAtualizarProduto from "./pages/PAtualizar/PAtualizarProduto/PAtualizarProduto";
import PDetalhesPedido from "./pages/PDetalhes/PDetalhesPedido/PDetalhesPedido";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutFarmacia />}>
          <Route path="/" element={<PHome />} />
          <Route path="/lista/produto" element={<PProdutos />} />
          <Route path="/lista/cliente" element={<PClientes />} />
          <Route path="/lista/pedido" element={<PPedidos />} />
          <Route path="/cadastro/produto" element={<PCadastroProduto />} />
          <Route path="/cadastro/cliente" element={<PCadastroCliente />} />
          <Route path="/cadastro/pedido" element={<PCadastroPedido />} />
          <Route
            path="/atualizar/produto/:idProduto"
            element={<PAtualizarProduto />}
          />
          <Route
            path="/detalhes/pedido/:idVenda"
            element={<PDetalhesPedido />}
          />
          <Route
            path="*"
            element={<p role="alert">Página não encontrada.</p>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
