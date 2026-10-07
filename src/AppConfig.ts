export const SERVER_CFG = {
    SERVER_URL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3333',

    // As rotas do Express não usam o prefixo /api (apenas a rota de boas-vindas).
    ENDPOINT_CLIENTES: '/clientes',
    ENDPOINT_PRODUTOS: '/produtos',
    ENDPOINT_PEDIDOS: '/pedidos',
    ENDPOINT_ITENS: '/itens'
}