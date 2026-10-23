// Cambiá este número por el de tu negocio, con código de país y sin espacios.
// Ejemplo Argentina: 5491112345678
const CONTACT_PHONE = "5491112345678";
const DISPLAY_PHONE = "+54 9 11 1234-5678";

// Editá este array para actualizar nombres, descripciones, precios o fotografías.
const products = [
  { id: 1, name: "Mate Algarrobo", category: "Mates", description: "Madera de algarrobo torneada a mano, con acabado natural.", price: 18500, image: "https://picsum.photos/seed/mate-algarrobo/400/300", alt: "Mate artesanal de madera", featured: true },
  { id: 2, name: "Mate Calden", category: "Mates", description: "Una pieza liviana y cálida para acompañar tus rondas.", price: 21000, image: "https://picsum.photos/seed/mate-calden/400/300", alt: "Mate de madera clara" },
  { id: 3, name: "Tabla de Asado", category: "Cocina", description: "Tabla robusta de madera maciza, ideal para compartir.", price: 32000, image: "https://picsum.photos/seed/tabla-asado/400/300", alt: "Tabla de cocina de madera" },
  { id: 4, name: "Tabla de Picada", category: "Cocina", description: "Formato práctico con veta única y bordes suavemente pulidos.", price: 24500, image: "https://picsum.photos/seed/tabla-picada/400/300", alt: "Tabla de madera para picada" },
  { id: 5, name: "Cuenco Nido", category: "Cocina", description: "Cuenco torneado para servir frutos, pan o lo que más te guste.", price: 17800, image: "https://picsum.photos/seed/cuenco-nido/400/300", alt: "Cuenco artesanal de madera" },
  { id: 6, name: "Bandeja Serena", category: "Decoración", description: "Bandeja de líneas simples para vestir tus momentos cotidianos.", price: 28900, image: "https://picsum.photos/seed/bandeja-serena/400/300", alt: "Bandeja decorativa de madera" },
  { id: 7, name: "Porta Sahumerio", category: "Decoración", description: "Un detalle pequeño y natural para sumar calma a tus espacios.", price: 9500, image: "https://picsum.photos/seed/porta-sahumerio/400/300", alt: "Porta sahumerio de madera" },
  { id: 8, name: "Cuenco Raíz", category: "Decoración", description: "Formas orgánicas que celebran las vetas de la madera.", price: 22500, image: "https://picsum.photos/seed/cuenco-raiz/400/300", alt: "Cuenco de madera con vetas naturales" }
];

const productGrid = document.querySelector("#product-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const whatsappBase = `https://wa.me/${CONTACT_PHONE}`;

function formatPrice(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-image-wrap">
      <img class="product-image" src="${product.image}" alt="${product.alt}" loading="lazy" width="400" height="300">
      <span class="product-category">${product.category}</span>
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-bottom">
        <span class="product-price">${formatPrice(product.price)}</span>
        <a class="order-button" href="${whatsappBase}?text=${encodeURIComponent(`Hola, quisiera consultar por ${product.name}.`)}" target="_blank" rel="noopener">
          Pedir por WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>`;
  return card;
}

function renderProducts(category = "Todos") {
  const visibleProducts = category === "Todos"
    ? products
    : products.filter((product) => product.category === category);

  productGrid.replaceChildren(...visibleProducts.map(createProductCard));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderProducts(button.dataset.category);
  });
});

const phoneHref = `tel:+${CONTACT_PHONE}`;
document.querySelector("#header-phone").href = phoneHref;
document.querySelector("#header-phone-label").textContent = DISPLAY_PHONE;
document.querySelector("#footer-phone").href = phoneHref;
document.querySelector("#footer-phone-label").textContent = DISPLAY_PHONE;
document.querySelector("#contact-whatsapp").href = `${whatsappBase}?text=${encodeURIComponent("Hola, quiero consultar por sus productos artesanales.")}`;
document.querySelector("#floating-whatsapp").href = `${whatsappBase}?text=${encodeURIComponent("Hola, quiero consultar por sus productos artesanales.")}`;
document.querySelector("#year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  mainNav.classList.remove("is-open");
}));

renderProducts();
