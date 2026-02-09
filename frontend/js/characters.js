// ============================
// FILTRES
// ============================
const filterBtn = document.getElementById("filterBtn");
const filtersPopup = document.getElementById("filtersPopup");
const filterUniverseBtn = document.getElementById("filterUniverse");

let allCharacters = []; // Stockage global des personnages

// Afficher / masquer les filtres
filterBtn.addEventListener("click", () => {
  filtersPopup.style.display =
    filtersPopup.style.display === "flex" ? "none" : "flex";
});

// ============================
// CHARGEMENT DES PERSONNAGES
// ============================
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("characters-grid");

  if (!grid) {
    console.error("❌ characters-grid introuvable");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/characters");
    allCharacters = await res.json(); // sauvegarde globale
    displayCharacters(allCharacters);  // affichage initial
  } catch (err) {
    console.error("🔥 Erreur API :", err);
    grid.innerHTML = `<p class="error">Erreur de chargement des personnages 🕷️</p>`;
  }
});

// ============================
// FONCTION D'AFFICHAGE DES PERSONNAGES
// ============================
function displayCharacters(characters) {
  const grid = document.getElementById("characters-grid");
  grid.innerHTML = "";

  characters.forEach(char => {
    const card = document.createElement("article");
    card.className = "character-card";

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

  initCardEffects(); // réactive effets sur nouvelles cartes
}

// ============================
// EFFETS MARVEL RIVALS (FIXÉS)
// ============================
function initCardEffects() {
  document.querySelectorAll(".character-card").forEach(card => {

    let isHovering = false;

    // ENTRÉE
    card.addEventListener("mouseenter", () => {
      isHovering = true;
      card.classList.add("flash");

      card.style.transition = "transform 0.12s ease-out";
      card.style.transform = "scale(1.12) rotateX(4deg) rotateY(-4deg)";

      setTimeout(() => {
        if (!isHovering) return;
        card.style.transform = "scale(1.1) rotateX(0deg) rotateY(0deg)";
      }, 90);

      setTimeout(() => card.classList.remove("flash"), 350);
    });

    // TILT DYNAMIQUE
    card.addEventListener("mousemove", e => {
      if (!isHovering) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 50;
      const rotateX = (0.5 - y) * 40;

      card.style.transform =
        `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.1)`;
    });

    // SORTIE
    card.addEventListener("mouseleave", () => {
      isHovering = false;

      card.style.transition = "none";
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";

      requestAnimationFrame(() => {
        card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
      });
    });
  });
}

// ============================
// MENU DÉROULANT UNIVERS
// ============================
filterUniverseBtn.addEventListener("click", () => {
  // Supprimer ancien menu
  const existing = document.getElementById("universe-menu");
  if (existing) existing.remove();

  // Créer menu ul
  const ul = document.createElement("ul");
  ul.id = "universe-menu";

  // Tous les univers
  const liAll = document.createElement("li");
  liAll.textContent = "Tous";
  liAll.addEventListener("click", () => displayCharacters(allCharacters));
  ul.appendChild(liAll);

  // Univers uniques
  const universList = [...new Set(allCharacters.map(c => c.universe))];
  universList.forEach(univ => {
    const li = document.createElement("li");
    li.textContent = univ;
    li.addEventListener("click", () => {
      const filtered = allCharacters.filter(c => c.universe === univ);
      displayCharacters(filtered);
    });
    ul.appendChild(li);
  });

  // Ajouter le menu après le bouton Univers
  filterUniverseBtn.parentElement.appendChild(ul);
});
