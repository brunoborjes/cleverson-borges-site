/**
 * CLEVERSON BORGES ADVOCACIA PREVIDENCIÁRIA
 * Arquitetura de Interação UI/UX e Performance
 */

const WHATSAPP_PHONE = "5532920007640"; // Ajuste conforme perfil local/Juiz de Fora
const WHATSAPP_MSG = encodeURIComponent("Olá! Gostaria de agendar uma análise técnica sobre Direito Previdenciário.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_MSG}`;

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Configuração Global de Links WhatsApp
  document.querySelectorAll(".whatsapp-link").forEach(link => {
    link.href = WHATSAPP_URL;
  });

  // 2. Header State (Glassmorphism Dinâmico)
  const header = document.getElementById("site-header");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Drawer Navigation
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const closeBtn = document.getElementById("drawer-close");
  const overlay = document.getElementById("drawer-overlay");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  const toggleDrawer = (state) => {
    if (state) {
      drawer.classList.add("open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Previne scroll ao fundo
    } else {
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  if(toggleBtn) toggleBtn.addEventListener("click", () => toggleDrawer(true));
  if(closeBtn) closeBtn.addEventListener("click", () => toggleDrawer(false));
  if(overlay) overlay.addEventListener("click", () => toggleDrawer(false));
  drawerLinks.forEach(link => link.addEventListener("click", () => toggleDrawer(false)));

  // 4. Smooth Scroll Nativo + Compensação do Header Fixo
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPos = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPos,
          behavior: "smooth"
        });
      }
    });
  });

  // 5. Accordion Behavior exclusivo (Deixa apenas 1 aberto, usando HTML5 <details>)
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    item.addEventListener("toggle", (e) => {
      if (item.open) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item) otherItem.removeAttribute("open");
        });
      }
    });
  });

  // 6. Scroll Reveal Animation (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Anima apenas uma vez para não sobrecarregar
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-up").forEach(el => {
    revealObserver.observe(el);
  });

});