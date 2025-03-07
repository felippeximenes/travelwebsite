<h1> 🇺🇸 - English </h1>

# README - Landing Page

## Description
This project is a **responsive landing page** with a modern design, using **HTML, CSS, and JavaScript**. The page includes smooth animations, intuitive navigation, and adapts to different screen sizes.

## Code Structure

### 1. **Styling (CSS)**
- The **style.css** file defines the visual identity of the page.
- Uses CSS variables for easy customization of colors and sizes.
- Includes responsive styles for **desktop, tablets, and mobile devices**.
- Applies effects such as **transitions, shadows, and animations** for an enhanced visual experience.

### 2. **HTML - Page Structure**
- Includes sections like **header**, **destinations**, **travel plans**, **image gallery**, and **footer**.
- Contains a **subscription form** for email collection.
- Simple and organized navigation with interactive links.

### 3. **JavaScript - Interactivity**
- **Scroll animation effect:**
  - Uses **IntersectionObserver** to add/remove the `.show` class as elements enter the screen.
  - Enhances page dynamics, making the experience smoother.

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

## Features
✅ Responsive design  
✅ Scroll animation effects  
✅ Modern and intuitive layout  
✅ Well-structured sections  

## Try here

- link: https://quiet-bienenstitch-a8a314.netlify.app/


## How to Use
1. Clone or download the repository.
2. Open the **index.html** file in a browser.
3. Explore the landing page and see the effects in action!

____________________


<h1> 🇧🇷 - Português </h1>


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


