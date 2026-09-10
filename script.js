const WHATSAPP_LINK = "https://wa.me/5532920007640?text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista%20sobre%20meu%20caso%20no%20INSS.";

document.addEventListener("DOMContentLoaded", () => {
  const whatsappButtons = document.querySelectorAll(".whatsapp-link");
  whatsappButtons.forEach(button => {
    button.setAttribute("href", WHATSAPP_LINK);
  });

  // ---- Header que some suavemente ao rolar e reaparece ao voltar ao topo ----
  const header = document.querySelector(".site-header");

  if (header) {
    // Distância de scroll (em px) até o header ficar totalmente transparente
    const FADE_DISTANCE = 220;
    // Opacidade mínima (não deixamos ir a 0 puro, para não "sumir" de forma abrupta)
    const MIN_OPACITY = 0;

    let ticking = false;

    const updateHeaderOpacity = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      // Calcula a opacidade proporcional ao quanto já rolou a página
      let opacity = 1 - scrollY / FADE_DISTANCE;
      opacity = Math.max(MIN_OPACITY, Math.min(1, opacity));

      header.style.opacity = opacity;

      // Evita que o header capture cliques quando estiver praticamente invisível
      header.classList.toggle("is-faded", opacity < 0.05);

      ticking = false;
    };

    // requestAnimationFrame evita recalcular a opacidade mais vezes do que o necessário
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeaderOpacity);
          ticking = true;
        }
      },
      { passive: true }
    );

    // Garante o estado correto caso a página já carregue com scroll (ex: F5 no meio da página)
    updateHeaderOpacity();
  }
});
