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

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita reload e garante tracking

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_submit",
      form_name: "subscribeForm",
    });

    // opcional: feedback simples pro usuário
    form.reset();
    alert("Cadastro enviado!");
  });
});
