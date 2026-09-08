# Segurança do checkout

O checkout público usa a Edge Function `criar-pedido` do Supabase. A função não expõe a chave de serviço no navegador.

Proteções ativas:

- validação de origem (CORS) para os domínios autorizados;
- limite de 5 tentativas por combinação de IP e e-mail em 15 minutos;
- limite de quantidade por pedido (1 a 20);
- validação de e-mail, telefone, CPF, CEP, endereço e tamanho;
- conferência do produto e do estoque no banco antes de criar o pedido;
- preço e frete calculados no servidor, sem confiar no valor enviado pelo navegador;
- criação do pedido e registro do pagamento PIX no banco usando credencial de servidor somente na Edge Function;
- registro de notificação administrativa para novos pedidos.

No banco, a função `public.checkout_rate_limit` é `SECURITY DEFINER`, com `search_path` fixado em `public`, e o `EXECUTE` foi restringido a `anon`, `authenticated` e `service_role`.

## Configuração

Projeto Supabase: `espaco-cris-calcados` (`nnhljxmmrqekoxcapdkm`).

A função `criar-pedido` permanece pública (`verify_jwt = false`) porque o cliente ainda precisa conseguir iniciar uma compra sem cadastro/login. A proteção contra abuso é feita dentro da própria função e no banco.
