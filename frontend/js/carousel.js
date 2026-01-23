document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");

  fetch("http://localhost:3000/api/characters")
    .then(res => res.json())
    .then(data => {
      // 1) Génère les slides
      data.forEach(char => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");
        slide.innerHTML = `
          <img src="${char.image_url}" alt="${char.name}" class="carousel-img">
          <h3 class="carousel-name">${char.name}</h3>
          <p class="carousel-universe">${char.universe}</p>
        `;
        carousel.appendChild(slide);
      });

      // 2) Duplique pour l'effet infini
      const slides = Array.from(carousel.children);
      slides.forEach(slide => {
        carousel.appendChild(slide.cloneNode(true));
      });
    })
    .catch(err => console.error("Erreur fetch characters:", err));
});
