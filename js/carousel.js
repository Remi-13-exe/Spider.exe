document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  let offset = 0;              // position horizontale du carrousel
  const speed = 10;            // vitesse de défilement
  let isPaused = false;        // pause lors du hover

  // 🔹 Récupération des personnages depuis l'API
  fetch("https://spider-exe.onrender.com/api/characters")
    .then(res => res.json())
    .then(data => {

      /* ------------------------------------------------------ */
      /* FONCTION : applique les effets 3D + clic sur une slide */
      /* ------------------------------------------------------ */
      function setupSlide(slide, char) {
        const wrapper = slide.querySelector(".slide-3d-wrapper");

        // 🟦 Hover → pause + flash
        slide.addEventListener("mouseenter", () => {
          isPaused = true;
          wrapper.classList.add("flash");
          setTimeout(() => wrapper.classList.remove("flash"), 350);
        });

        // 🟦 Mouvement de souris → rotation 3D dynamique
        slide.addEventListener("mousemove", e => {
          const rect = slide.getBoundingClientRect();

          // Position relative du curseur dans la carte (0 → 1)
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          // Calcul des rotations
          const rotateY = (x - 0.5) * 60;  // rotation horizontale
          const rotateX = (0.5 - y) * 50;  // rotation verticale
          const scale = 1.18;              // zoom léger

          wrapper.style.transform =
            `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
        });

        // 🟦 Sortie du hover → reset
        slide.addEventListener("mouseleave", () => {
          isPaused = false;
          wrapper.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
        });

        // 🟥 Clic → redirection vers la page du personnage
        slide.addEventListener("click", () => {
          window.location.href = `character-detail.html?id=${char.id}`;
        });
      }

      /* ------------------------------------------------------ */
      /* 1️⃣ Création des slides à partir des données API       */
      /* ------------------------------------------------------ */
      data.forEach(char => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");

        // Structure HTML interne de la carte
        slide.innerHTML = `
          <div class="slide-3d-wrapper">
            <div class="slide-inner">
              <img src="${char.image_url}" alt="${char.name}" class="carousel-img">
              <h3 class="carousel-name">${char.name}</h3>
              <p class="carousel-universe">${char.universe}</p>
            </div>
          </div>
        `;

        setupSlide(slide, char);  // applique les effets
        carousel.appendChild(slide);
      });

      /* ------------------------------------------------------ */
      /* 2️⃣ Duplication des slides pour créer un effet infini  */
      /* ------------------------------------------------------ */
      const slides = Array.from(carousel.children);

      slides.forEach((slide, i) => {
        const clone = slide.cloneNode(true); // copie complète
        setupSlide(clone, data[i % data.length]); // réapplique les events
        carousel.appendChild(clone);
      });

      /* ------------------------------------------------------ */
      /* Calcul de la largeur totale du carrousel               */
      /* ------------------------------------------------------ */
      const totalWidth = Array.from(carousel.children)
        .reduce((acc, slide) => acc + slide.offsetWidth + 20, 0);

      /* ------------------------------------------------------ */
      /* 3️⃣ Animation principale du carrousel                  */
      /* ------------------------------------------------------ */
      function animate() {

        // 🟦 Défilement automatique (sauf si hover)
        if (!isPaused) {
          offset += speed;

          // Reset quand on a parcouru la moitié (car doublé)
          if (offset >= totalWidth / 2) offset = 0;

          carousel.style.transform = `translateX(${-offset}px)`;
        }

        // 🟦 Zoom dynamique selon la position dans l'écran
        const viewportCenter = window.innerWidth / 2;

        Array.from(carousel.children).forEach(slide => {

          // Si la slide est hover, on ne touche pas à son scale
          if (slide.matches(":hover")) return;

          const rect = slide.getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;

          // Distance entre le centre de l'écran et la slide
          const distance = Math.abs(viewportCenter - slideCenter);
          const maxDistance = viewportCenter;

          // Calcul du scale (0.7 → 1.0)
          const scale = 0.7 + (1 - Math.min(distance / maxDistance, 1)) * 0.3;

          slide.querySelector(".slide-3d-wrapper").style.transform =
            `scale(${scale}) rotateX(0deg) rotateY(0deg)`;

          slide.style.zIndex = Math.floor(scale * 100); // slide la plus proche au-dessus
        });

        requestAnimationFrame(animate); // boucle infinie
      }

      animate(); // démarre l’animation
    })
    .catch(err => console.error("Erreur fetch characters:", err));
});
