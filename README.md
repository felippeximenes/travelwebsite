# README - Landing Page

## Descrição
Este projeto é uma **landing page** responsiva com um design moderno, utilizando **HTML, CSS e JavaScript**. A página inclui animações suaves, uma navegação intuitiva e se adapta a diferentes tamanhos de tela.

## Estrutura do Código

### 1. **Estilização (CSS)**
- O arquivo **style.css** define a identidade visual da página.
- Utiliza variáveis CSS para facilitar personalização de cores e tamanhos.
- Inclui estilos responsivos para **desktop, tablets e dispositivos móveis**.
- Aplica efeitos como **transições, sombras e animações** para uma experiência visual melhorada.

### 2. **HTML - Estrutura da Página**
- Inclui seções como **cabeçalho (header)**, **destinos**, **planos de viagem**, **galeria de imagens** e **rodapé**.
- Possui um **formulário de inscrição** para coleta de e-mails.
- Navegação simples e organizada com links interativos.

### 3. **JavaScript - Interatividade**
- **Efeito de aparição ao rolar a página:**
  - Utiliza **IntersectionObserver** para adicionar/remover a classe `.show` conforme os elementos entram na tela.
  - Melhora a dinamização da página, tornando a experiência mais fluida.

```javascript
const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    });
});

const elements = document.querySelectorAll('.hidden');

elements.forEach((element) => myObserver.observe(element));
```

## Funcionalidades
✅ Design responsivo
✅ Efeitos de animação ao rolar a tela
✅ Layout moderno e intuitivo
✅ Seções bem estruturadas

## Teste ao vivo

- link: https://quiet-bienenstitch-a8a314.netlify.app/

## Como Usar
1. Clone ou baixe o repositório.
2. Abra o arquivo **index.html** em um navegador.
3. Explore a landing page e veja os efeitos em ação!


