// Récupération des éléments
const filterBtn = document.getElementById('filterBtn');
const filtersPopup = document.getElementById('filtersPopup');

// Afficher / masquer les filtres au clic
filterBtn.addEventListener('click', () => {
  if (filtersPopup.style.display === 'flex') {
    filtersPopup.style.display = 'none';
  } else {
    filtersPopup.style.display = 'flex';
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("characters-grid");

  try {
    const res = await fetch("http://localhost:3000/api/characters");
    const characters = await res.json();

    grid.innerHTML = "";

    characters.forEach(char => {
      const card = document.createElement("article");
      card.classList.add("character-card");

      card.innerHTML = `
        <div class="character-img-wrapper">
          <img src="${char.image_url}" alt="${char.name}">
        </div>

        <h2 class="character-name">${char.name}</h2>

        <div class="character-meta">
          <span class="badge">${char.universe}</span>
        </div>
      `;

      grid.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="error">Erreur de chargement des personnages 🕷️</p>`;
  }

  /* ============================================================
     EFFET MARVEL RIVALS SUR LES CARTES
  ============================================================ */
document.querySelectorAll(".character-card").forEach(card => {

  // FLASH au survol
  card.addEventListener("mouseenter", () => {
    card.classList.add("flash");

    // Petit rebond d'entrée façon Marvel
    card.style.transition = "transform 0.08s ease-out";
    card.style.transform = "scale(1.15) rotateX(4deg) rotateY(-4deg)";

    setTimeout(() => {
      card.style.transition = "transform 0.12s ease-out";
      card.style.transform = "scale(1.12) rotateX(0deg) rotateY(0deg)";
    }, 80);

    setTimeout(() => card.classList.remove("flash"), 350);
  });

  // TILT dynamique boosté
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // 🔥 Version plus agressive
    const rotateY = (x - 0.5) * 80; // -40 → 40
    const rotateX = (0.5 - y) * 65; // -32 → 32
    const scale = 1.18;

    card.style.transform =
      `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
  });

  // RESET
  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.25s ease-out";
    card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  });

});
});