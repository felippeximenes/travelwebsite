// Mantém seu código de animação
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const elements = document.querySelectorAll(".hidden");
elements.forEach((element) => myObserver.observe(element));

// --- Tracking GTM/GA4: evento de conversão no envio do formulário ---
window.dataLayer = window.dataLayer || [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribeForm");
  if (!form) return;

  form.addEventListener("submit", () => {
    // Dispara um evento no dataLayer que o GTM vai capturar
    window.dataLayer.push({
      event: "lead_submit",
      form_name: "subscribeForm",
    });
  });
});
