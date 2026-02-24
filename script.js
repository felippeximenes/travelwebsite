
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
  // ✅ mudança mínima: pega o form do bloco subscribe (sem precisar de id no HTML)
  const form = document.querySelector(".subscribe_form form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita reload e garante tracking

    window.dataLayer.push({
      event: "lead_submit",
      form_name: "subscribeForm",
    });

    form.reset();
    alert("Cadastro enviado!");
  });
});
