// carousel.js

document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.getElementById("carousel");

  // 1️⃣ Récupération des personnages depuis le backend
  fetch("http://localhost:3000/api/characters") // <-- adapte l'URL à ton backend
    .then(response => response.json())
    .then(data => {
      // data = tableau de personnages
      data.forEach(character => {
        // 2️⃣ Création de la slide
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");

        slide.innerHTML = `
          <img src="${character.image_url}" alt="${character.name}" class="carousel-img">
          <h3 class="carousel-name">${character.name}</h3>
          <p class="carousel-universe">${character.universe}</p>
        `;

        carouselContainer.appendChild(slide);
      });

      // 3️⃣ Initialisation de l'animation carousel
      initCarousel();
    })
    .catch(err => console.error("Erreur fetch characters:", err));
});

// 4️⃣ Fonction pour faire défiler le carousel (GSAP)
function initCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;
  let current = 0;

  // Taille de la slide
  const slideWidth = slides[0].offsetWidth;

  function goNext() {
    current++;
    if (current >= totalSlides) current = 0;
    gsap.to("#carousel", { x: -slideWidth * current, duration: 1, ease: "power2.inOut" });
  }

  function goPrev() {
    current--;
    if (current < 0) current = totalSlides - 1;
    gsap.to("#carousel", { x: -slideWidth * current, duration: 1, ease: "power2.inOut" });
  }

  // Auto-scroll toutes les 4s
  setInterval(goNext, 4000);

  // Tu peux ajouter boutons prev/next si tu veux
}
