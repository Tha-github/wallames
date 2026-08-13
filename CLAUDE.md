# Eu Amo Pastel — Landing Page

## Sobre o projeto
Landing page de página única para a pastelaria **Eu Amo Pastel** (Frutal/MG).
Responsável: Wallames dos Santos.
Objetivo: gerar leads e apresentar a empresa de forma institucional.
Público-alvo: homens e mulheres.
Slogan: "O melhor pastel do mundo, a batata mais famosa do Brasil".

## Estrutura de arquivos
index.html · style.css · script.js · /img

**Regras obrigatórias:**
- Arquivos SEPARADOS. Nunca usar `<style>` ou `<script>` inline no HTML.
- Nunca usar `onclick` no HTML — todos os eventos via `addEventListener` no `script.js`.
- Sem frameworks e sem dependências externas (apenas Google Fonts).
- Código comentado em português.
- Mobile-first, 100% responsivo (testar 360px, 768px e 1440px).
- Fazer apenas o que foi pedido na etapa atual. Nunca adiantar seções futuras.
- Sempre editar os arquivos existentes, nunca recriar do zero.

## Identidade visual

Variáveis em `:root`:

| Variável | Valor |
|---|---|
| `--preto` | `#0b0b0b` |
| `--preto-2` | `#121212` |
| `--ouro` | `#c9a227` |
| `--ouro-claro` | `#e8c96a` |
| `--vermelho` | `#b21620` |
| `--amarelo` | `#f2b705` |
| `--branco` | `#ffffff` |
| `--cinza` | `#b8b3a8` |

**PROIBIDO** usar azul, verde ou roxo em qualquer elemento.

- Estilo: fundo escuro, detalhes em ouro. Design "fino e rico", elegante e premium — nada infantil ou poluído.
- Títulos: Cormorant Garamond (600, 700).
- Textos: Montserrat (300, 400, 500, 600).
- Labels e botões: caixa alta com `letter-spacing` amplo.
- Referência de organização/clareza: mcdonalds.com.br (mas com estética premium).

## Classes globais
`.container` (min(1140px, 90%), centralizado) · `.btn` · `.btn-ouro` (fundo dourado, texto preto) · `.btn-vazado` (transparente com borda dourada) · `.reveal` / `.visivel` (animação por scroll).

## Constantes
No topo do `script.js`: `const WHATSAPP = "5534991973508"; // ALTERAR AQUI`
Todos os links de WhatsApp (delivery, franquia, botão flutuante, redes sociais) usam essa constante.

## Produtos
Pastel · Batata Recheada · Açaí · Sucos Finos · Refrigerante · Caldo de Cana Gourmetizado

## Links
Instagram: https://www.instagram.com/euamopastel.frutal

## Botões padrão
**[SEJA FRANQUEADO]** → âncora `#franquia` · **[DELIVERY]** → link do WhatsApp

## Footer (texto exato)
`© 2026 Eu Amo Pastel — Todos os direitos reservados. Site desenvolvido por Top Site`

## Ordem das seções
1. Banner (`#banner`)
2. Sobre (`#sobre`)
3. Cardápio (`#cardapio`)
4. Franquia (`#franquia`) — CTA "Venha ser um franqueado da receita de pastelaria que mais cresce!", redireciona para o WhatsApp
5. Redes sociais
6. Footer

## Progresso
- [ ] Etapa 1 — Base do projeto
- [ ] Etapa 2 — Banner com animação
- [ ] Etapa 3 — Seção Sobre
- [ ] Etapa 4 — Cardápio
- [ ] Etapa 5 — CTA de franquia
- [ ] Etapa 6 — Redes sociais, footer e ajustes finais