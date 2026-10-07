# MedFlow — Frontend

Interface simples em React e TypeScript para gerenciar uma farmácia.

## Executar

Na pasta farmacia-frontend:

```sh
npm install
npm run dev
```

Abra a URL informada pelo Vite. O backend e o PostgreSQL precisam estar em execução para carregar e salvar os registros.

A API padrão é http://localhost:3333. Para usar outro endereço, crie um arquivo .env.local:

```env
VITE_SERVER_URL=http://localhost:3333
```

## Funcionalidades

- Produtos: listagem, busca, cadastro, edição e filtro por estoque baixo.
- Clientes: listagem, busca e cadastro.
- Pedidos: listagem, cadastro com vários produtos, detalhes e total.
- Itens dos pedidos: inclusão, edição de quantidade e preço e remoção com confirmação.
- Interface adaptada para celular, mensagens de erro e estados de carregamento.

Não há autenticação. As ações disponíveis seguem as rotas do backend; não existem rotas para excluir produtos, editar/excluir clientes ou excluir pedidos.

## Verificação

```sh
npm run lint
npm run build
```

## Organização do código

- `src/App.tsx`: entrada da interface.
- `src/pages/PHome`: estrutura principal e navegação entre telas.
- `src/pages/PProdutos`, `PClientes` e `PPedidos`: listagem, busca e formulários de cada funcionalidade.
- `src/components`: navegação, rodapé, resumo, painel, avisos, modal, campos e seleção de produtos reutilizáveis.
- `src/hooks/useFarmacia.ts`: carregamento dos dados, atualização e mensagens das operações.
- `src/fetch`: comunicação com o backend.
- `src/dto`: tipos dos dados.
- `src/utils/formatacao.ts`: formatação de datas e valores em reais.
- `src/styles/global.css`: estilos e regras responsivas.

### Componentes por funcionalidade

- `components/Produtos`: `ListagemProdutos` e `FormularioProduto`.
- `components/Clientes`: `ListagemClientes` e `FormularioCliente`.
- `components/Pedidos`: `ListagemPedidos`, `FormularioPedido`, `DetalhesPedido`, `FormularioItemPedido`, `CarrinhoPedido` e `TotalPedido`.

As páginas coordenam a abertura dos formulários e os dados compartilhados. As listagens mantêm a busca e os filtros; os formulários mantêm os campos de entrada. Os componentes comuns (Campo, Modal, Painel e AdicionarProduto) são reutilizados pelas funcionalidades.

AlertCard, ConfirmacaoCard e BoasVindas são componentes anteriores preservados; atualmente não fazem parte das telas principais.

### Rotas da interface

O App.tsx declara as rotas com BrowserRouter, Routes e Route. LayoutFarmacia mantém a navegação, o resumo e os dados compartilhados através de Outlet.

- `/`: tela inicial com produtos.
- `/lista/produto`, `/lista/cliente`, `/lista/pedido`: listagens.
- `/cadastro/produto`, `/cadastro/cliente`, `/cadastro/pedido`: cadastros.
- `/atualizar/produto/:idProduto`: edição de produto.
- `/detalhes/pedido/:idVenda`: detalhes e manutenção dos itens do pedido.

Os formulários continuam em modais, com URLs próprias que podem ser abertas diretamente. O botão Voltar do navegador acompanha a navegação. Em hospedagem de produção, configure o servidor para entregar index.html nas rotas da interface.
