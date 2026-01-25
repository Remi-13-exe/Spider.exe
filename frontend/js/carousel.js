document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  let offset = 0; 
  const speed = 3;
  let isPaused = false; // ⬅️ état pause

  fetch("http://localhost:3000/api/characters")
    .then(res => res.json())
    .then(data => {
      // 1️⃣ Génère les slides
      data.forEach(char => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");
        slide.innerHTML = `
          <img src="${char.image_url}" alt="${char.name}" class="carousel-img">
          <h3 class="carousel-name">${char.name}</h3>
          <p class="carousel-universe">${char.universe}</p>
        `;
        
        // ⬅️ Ajout pause au survol
        slide.addEventListener("mouseenter", () => isPaused = true);
        slide.addEventListener("mouseleave", () => isPaused = false);

        carousel.appendChild(slide);
      });

      // 2️⃣ Duplique pour l'effet infini
      const slides = Array.from(carousel.children);
      slides.forEach(slide => {
        const clone = slide.cloneNode(true);

        // ⬅️ IMPORTANT : ajouter aussi les events sur les clones
        clone.addEventListener("mouseenter", () => isPaused = true);
        clone.addEventListener("mouseleave", () => isPaused = false);

        carousel.appendChild(clone);
      });

      const totalWidth = Array.from(carousel.children)
        .reduce((acc, slide) => acc + slide.offsetWidth + 20, 0);

      // 3️⃣ Animation du carousel
      function animate() {

        if (!isPaused) { // ⬅️ stoppe le mouvement si pause
          offset += speed;
          if (offset >= totalWidth / 2) offset = 0;
          carousel.style.transform = `translateX(${-offset}px)`;
        }

        const viewportCenter = window.innerWidth / 2;

        Array.from(carousel.children).forEach(slide => {
          const rect = slide.getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;

          const distance = Math.abs(viewportCenter - slideCenter);
          const maxDistance = viewportCenter;

          let scale = 0.7 + (1 - Math.min(distance / maxDistance, 1)) * 0.3;

          slide.style.transform = `scale(${scale})`;
          slide.style.zIndex = Math.floor(scale * 100);
        });

        requestAnimationFrame(animate);
      }

      animate();
    })
    .catch(err => console.error("Erreur fetch characters:", err));
});
