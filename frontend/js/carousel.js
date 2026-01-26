document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  let offset = 0;
  const speed = 5;
  let isPaused = false;

  fetch("http://localhost:3000/api/characters")
    .then(res => res.json())
    .then(data => {

      function setupSlide(slide) {
        const wrapper = slide.querySelector(".slide-3d-wrapper");

        slide.addEventListener("mouseenter", () => {
          isPaused = true;

          // ⚡ FLASH AVANT OSCILLATION
          wrapper.classList.add("flash");
          setTimeout(() => wrapper.classList.remove("flash"), 350);
        });

        slide.addEventListener("mousemove", e => {
          const rect = slide.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          // 🔥 Penchement très prononcé (Marvel Rivals vibe)
          const rotateY = (x - 0.5) * 60; // -30 → 30
          const rotateX = (0.5 - y) * 50; // -25 → 25
          const scale = 1.18;

          wrapper.style.transform =
            `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
        });

        slide.addEventListener("mouseleave", () => {
          isPaused = false;
          wrapper.style.transform =
            "rotateY(0deg) rotateX(0deg) scale(1)";
        });
      }

      // 1️⃣ Création des slides
      data.forEach(char => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");

        slide.innerHTML = `
          <div class="slide-3d-wrapper">
            <div class="slide-inner">
              <img src="${char.image_url}" alt="${char.name}" class="carousel-img">
              <h3 class="carousel-name">${char.name}</h3>
              <p class="carousel-universe">${char.universe}</p>
            </div>
          </div>
        `;

        setupSlide(slide);
        carousel.appendChild(slide);
      });

      // 2️⃣ Duplication pour l'infini
      const slides = Array.from(carousel.children);
      slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        setupSlide(clone);
        carousel.appendChild(clone);
      });

      const totalWidth = Array.from(carousel.children)
        .reduce((acc, slide) => acc + slide.offsetWidth + 20, 0);

      // 3️⃣ Animation principale
      function animate() {
        if (!isPaused) {
          offset += speed;
          if (offset >= totalWidth / 2) offset = 0;
          carousel.style.transform = `translateX(${-offset}px)`;
        }

        // 🔹 Scale horizontal (hors carte survolée)
        const viewportCenter = window.innerWidth / 2;

        Array.from(carousel.children).forEach(slide => {
          if (slide.matches(":hover")) return;

          const rect = slide.getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;
          const distance = Math.abs(viewportCenter - slideCenter);
          const maxDistance = viewportCenter;

          const scale =
            0.7 + (1 - Math.min(distance / maxDistance, 1)) * 0.3;

          slide.querySelector(".slide-3d-wrapper").style.transform =
            `scale(${scale}) rotateX(0deg) rotateY(0deg)`;

          slide.style.zIndex = Math.floor(scale * 100);
        });

        requestAnimationFrame(animate);
      }

      animate();
    })
    .catch(err => console.error("Erreur fetch characters:", err));
});
