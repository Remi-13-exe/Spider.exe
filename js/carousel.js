document.addEventListener("DOMContentLoaded", () => {

  const carousel = document.getElementById("carousel");

  let offset = 0;
  const speed = 1.2;
  let isPaused = false;

  fetch("https://spider-exe.onrender.com/api/characters")
    .then(res => res.json())
    .then(data => {

      /* ------------------------------------------------ */
      /* Limite le nombre de personnages (perf mobile)   */
      /* ------------------------------------------------ */

      const characters = data.slice(0, 12);

      /* ------------------------------------------------ */
      /* Création fragment DOM (beaucoup plus rapide)    */
      /* ------------------------------------------------ */

      const fragment = document.createDocumentFragment();

      /* ------------------------------------------------ */
      /* Effets hover + 3D                               */
      /* ------------------------------------------------ */

      function setupSlide(slide, char) {

        const wrapper = slide.querySelector(".slide-3d-wrapper");

        slide.addEventListener("mouseenter", () => {
          isPaused = true;

          wrapper.classList.add("flash");

          setTimeout(() => {
            wrapper.classList.remove("flash");
          }, 350);
        });

        slide.addEventListener("mousemove", e => {

          const rect = slide.getBoundingClientRect();

          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          const rotateY = (x - 0.5) * 60;
          const rotateX = (0.5 - y) * 50;
          const scale = 1.18;

          wrapper.style.transform =
            `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;

        });

        slide.addEventListener("mouseleave", () => {

          isPaused = false;

          wrapper.style.transform =
            "rotateY(0deg) rotateX(0deg) scale(1)";

        });

        slide.addEventListener("click", () => {

          window.location.href =
            `character-detail.html?id=${char.id}`;

        });

      }

      /* ------------------------------------------------ */
      /* Création des slides                             */
      /* ------------------------------------------------ */

      characters.forEach(char => {

        const slide = document.createElement("div");

        slide.classList.add("carousel-slide");

        slide.innerHTML = `
          <div class="slide-3d-wrapper">
            <div class="slide-inner">

              <img
                src="${char.image_url}"
                alt="${char.name}"
                class="carousel-img"
                loading="lazy"
                decoding="async"
              >

              <h3 class="carousel-name">${char.name}</h3>
              <p class="carousel-universe">${char.universe}</p>

            </div>
          </div>
        `;

        setupSlide(slide, char);

        fragment.appendChild(slide);

      });

      carousel.appendChild(fragment);

      /* ------------------------------------------------ */
      /* Duplication slides pour boucle infinie          */
      /* ------------------------------------------------ */

      const slides = Array.from(carousel.children);

      slides.forEach((slide, i) => {

        const clone = slide.cloneNode(true);

        setupSlide(clone, characters[i % characters.length]);

        carousel.appendChild(clone);

      });

      /* ------------------------------------------------ */
      /* Largeur totale                                  */
      /* ------------------------------------------------ */

      const slidesArray = Array.from(carousel.children);

      const totalWidth = slidesArray.reduce((acc, slide) => {

        return acc + slide.offsetWidth + 20;

      }, 0);

      /* ------------------------------------------------ */
      /* Animation principale                            */
      /* ------------------------------------------------ */

      function animate() {

        if (!isPaused) {

          offset += speed;

          if (offset >= totalWidth / 2) {
            offset = 0;
          }

          carousel.style.transform =
            `translate3d(${-offset}px,0,0)`;

        }

        const viewportCenter = window.innerWidth / 2;

        slidesArray.forEach(slide => {

          if (slide.matches(":hover")) return;

          const rect = slide.getBoundingClientRect();

          const slideCenter =
            rect.left + rect.width / 2;

          const distance =
            Math.abs(viewportCenter - slideCenter);

          const maxDistance = viewportCenter;

          const scale =
            0.7 +
            (1 - Math.min(distance / maxDistance, 1)) * 0.3;

          slide.querySelector(".slide-3d-wrapper")
            .style.transform =
            `scale(${scale}) rotateX(0deg) rotateY(0deg)`;

          slide.style.zIndex = Math.floor(scale * 100);

        });

        requestAnimationFrame(animate);

      }

      animate();

    })

    .catch(err =>
      console.error("Erreur fetch characters:", err)
    );

});