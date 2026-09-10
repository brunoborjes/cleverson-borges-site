const WHATSAPP_LINK = "https://wa.me/5532920007640?text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista%20sobre%20meu%20caso%20no%20INSS.";

document.addEventListener("DOMContentLoaded", () => {
  const whatsappButtons = document.querySelectorAll(".whatsapp-link");
  whatsappButtons.forEach(button => {
    button.setAttribute("href", WHATSAPP_LINK);
  });

  // ---- Header que altera suavemente ao rolar e reaparece ao voltar ao topo ----
  const header = document.querySelector(".site-header");

  if (header) {
    // Escuta o evento de rolagem da janela
    window.addEventListener('scroll', () => {
      // Verifica a quantidade de pixels que a página rolou para baixo
      if (window.scrollY > 50) {
        // Se rolou mais de 50 pixels, adiciona a classe
        header.classList.add('header-scrolled');
      } else {
        // Se voltou para o topo (menos de 50px), remove a classe
        header.classList.remove('header-scrolled');
      }
    });
  }
});
