<h1> 🇺🇸 - English </h1>

# README - Landing Page

## Description
This project is a **responsive landing page** with a modern design, using **HTML, CSS, and JavaScript**. The page includes smooth animations, intuitive navigation, and adapts to different screen sizes!


https://github.com/user-attachments/assets/d447c8b5-ec60-41af-9a41-805dcd4b7fee



## Code Structure :)

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

## Google Tag Manager & Analytics (GTM + GA4)

This project includes the implementation of **Google Tag Manager (GTM)** integrated with **Google Analytics 4 (GA4)**, demonstrating a professional setup for data measurement and tracking.

### What was implemented
- Proper installation of **Google Tag Manager** on the website
- **GA4 integration via GTM** (no direct Analytics scripts added to the HTML)
- Container validation using **Tag Assistant (Preview Mode)**
- Verification of events and pageviews in **GA4 – Real-time reports**

### How GTM was implemented
- GTM script inserted inside the `<head>` tag
- `<noscript>` fallback added right after the opening `<body>` tag, following Google’s official recommendation

This approach ensures:
- Better code organization
- Easier addition of new events and conversions
- Tracking maintenance without requiring new deploys
- A standard approach used in professional marketing and product projects

### Validation
- GTM can be identified by inspecting the site’s HTML
- Events and pageviews were confirmed in GA4 in real time


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



https://github.com/user-attachments/assets/211af085-0536-4665-8814-194d92e83fa2



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

##  Google Tag Manager & Analytics (GTM + GA4)

Este projeto conta com a implementação do **Google Tag Manager (GTM)** integrada ao **Google Analytics 4 (GA4)**, demonstrando um setup profissional de mensuração e tracking.

### O que foi feito
- Instalação correta do **Google Tag Manager** no site
- Integração do **GA4 via GTM** (sem inserir scripts do Analytics diretamente no código)
- Validação do container utilizando **Tag Assistant (Preview Mode)**
- Verificação de eventos e acessos no **GA4 – Relatórios em Tempo Real**

### Como o GTM foi implementado
- Script do GTM inserido no `<head>` da página
- Fallback `<noscript>` logo após a abertura do `<body>`, seguindo a recomendação oficial do Google

Essa abordagem garante:
- Melhor organização do código
- Facilidade para adicionar novos eventos e conversões
- Manutenção de tracking sem necessidade de novos deploys
- Padrão utilizado em projetos profissionais de marketing e produto

### Validação
- O GTM pode ser identificado ao inspecionar o HTML do site
- Eventos e pageviews foram confirmados no GA4 em tempo real


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


