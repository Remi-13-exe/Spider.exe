document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  let offset = 0;
  const speed = 10;
  let isPaused = false;
  let totalWidth = 0;
  let cachedSlides = [];      // ✅ Cache du tableau (évite Array.from à chaque frame)
  let animationId = null;

  fetch("https://spider-exe.onrender.com/api/characters")
    .then(res => res.json())
    .then(data => {

      function setupSlide(slide, char) {
        const wrapper = slide.querySelector(".slide-3d-wrapper");

        // ✅ will-change prépare le GPU dès le départ
        wrapper.style.willChange = "transform";

        slide.addEventListener("mouseenter", () => {
          isPaused = true;
          wrapper.classList.add("flash");
          setTimeout(() => wrapper.classList.remove("flash"), 350);
        });

        slide.addEventListener("mousemove", e => {
          const rect = slide.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          const rotateY = (x - 0.5) * 60;
          const rotateX = (0.5 - y) * 50;
          wrapper.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.18)`;
        });

        slide.addEventListener("mouseleave", () => {
          isPaused = false;
          wrapper.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
        });

        slide.addEventListener("click", () => {
          window.location.href = `character-detail.html?id=${char.id}`;
        });
      }

      // ✅ Fragment pour éviter des reflows multiples lors de l'insertion DOM
      const fragment = document.createDocumentFragment();
      data.forEach(char => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");
        slide.innerHTML = `
          <div class="slide-3d-wrapper">
            <div class="slide-inner">
              <img src="${char.image_url}" alt="${char.name}" class="carousel-img" loading="lazy" decoding="async">
              <h3 class="carousel-name">${char.name}</h3>
              <p class="carousel-universe">${char.universe}</p>
            </div>
          </div>
        `;
        setupSlide(slide, char);
        fragment.appendChild(slide);
      });
      carousel.appendChild(fragment);

      // Duplication pour l'effet infini
      const originalSlides = Array.from(carousel.children);
      const cloneFragment = document.createDocumentFragment();
      originalSlides.forEach((slide, i) => {
        const clone = slide.cloneNode(true);
        setupSlide(clone, data[i % data.length]);
        cloneFragment.appendChild(clone);
      });
      carousel.appendChild(cloneFragment);

      // ✅ Cache du tableau une seule fois (pas recréé à chaque frame)
      cachedSlides = Array.from(carousel.children);

      // ✅ Calcul de totalWidth UNE seule fois après insertion complète
      // requestAnimationFrame garantit que le layout est calculé
      requestAnimationFrame(() => {
        totalWidth = cachedSlides.reduce((acc, slide) => acc + slide.offsetWidth + 20, 0);
        startAnimation();
      });
    })
    .catch(err => console.error("Erreur fetch characters:", err));

  function startAnimation() {
    const viewportCenter = window.innerWidth / 2;

    // ✅ Recalcul du centre viewport seulement au resize, pas à chaque frame
    window.addEventListener("resize", () => {
      viewportCenter = window.innerWidth / 2;
    }, { passive: true });

    // ✅ Tracker la slide survolée sans querySelectorAll à chaque frame
    let hoveredSlide = null;
    carousel.addEventListener("mouseover", e => {
      hoveredSlide = e.target.closest(".carousel-slide");
    });
    carousel.addEventListener("mouseleave", () => {
      hoveredSlide = null;
    });

    function animate() {
      if (!isPaused) {
        offset += speed;
        if (offset >= totalWidth / 2) offset = 0;
        // ✅ translateX via left chiffre pour éviter repaint inutile
        carousel.style.transform = `translateX(${-offset}px)`;
      }

      const vc = viewportCenter;

      // ✅ Pas de getBoundingClientRect dans la boucle — on utilise offsetLeft + offset
      for (let i = 0; i < cachedSlides.length; i++) {
        const slide = cachedSlides[i];
        if (slide === hoveredSlide) continue;

        const wrapper = slide.querySelector(".slide-3d-wrapper");
        const rect = slide.getBoundingClientRect();         // toujours nécessaire pour la position écran
        const slideCenter = rect.left + rect.width / 2;
        const distance = Math.abs(vc - slideCenter);
        const scale = 0.7 + (1 - Math.min(distance / vc, 1)) * 0.3;

        // ✅ Écriture condensée sans template string imbriquée
        wrapper.style.transform = `scale(${scale})`;
        slide.style.zIndex = scale * 100 | 0;              // ✅ | 0 = Math.floor rapide
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();
  }
});