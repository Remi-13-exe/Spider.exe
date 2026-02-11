// ============================
// FILTRES
// ============================
const filterBtn = document.getElementById("filterBtn");
const filtersPopup = document.getElementById("filtersPopup");
const filterUniverseBtn = document.getElementById("filterUniverse");
const filterTypeBtn = document.getElementById("filterType");

let allCharacters = [];

// Toggle popup filtres
filterBtn.addEventListener("click", () => {
  filtersPopup.style.display =
    filtersPopup.style.display === "flex" ? "none" : "flex";
});

// ============================
// CHARGEMENT DES PERSONNAGES
// ============================
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("characters-grid");
  if (!grid) return;

  try {
    const res = await fetch("http://localhost:3000/api/characters");
    allCharacters = await res.json();
    displayCharacters(allCharacters);
  } catch (err) {
    console.error(err);
    grid.innerHTML =
      `<p class="error">Erreur de chargement des personnages 🕷️</p>`;
  }
});

// ============================
// AFFICHAGE DES PERSONNAGES
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

  initCardEffects(); // applique les effets sur toutes les cartes
}

// ============================
// MENU DÉROULANT UNIVERS (API)
// ============================
filterUniverseBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // empêche la fermeture immédiate

  // Supprime ancien menu si existant
  const existing = document.getElementById("universe-menu");
  if (existing) {
    existing.remove();
    return;
  }

  // Crée menu ul
  const ul = document.createElement("ul");
  ul.id = "universe-menu";

  // Item "Tous"
  const liAll = document.createElement("li");
  liAll.textContent = "Tous";
  liAll.addEventListener("click", () => {
    displayCharacters(allCharacters);
    ul.remove();
  });
  ul.appendChild(liAll);

  // Univers uniques depuis API
  const universList = [...new Set(allCharacters.map(c => c.universe))];
  universList.forEach(univ => {
    const li = document.createElement("li");
    li.textContent = univ;
    li.addEventListener("click", () => {
      const filtered = allCharacters.filter(c => c.universe === univ);
      displayCharacters(filtered);
      ul.remove();
    });
    ul.appendChild(li);
  });

  // Affiche le menu sous le bouton
  filterUniverseBtn.appendChild(ul);
});

// Ferme le menu si clic ailleurs
document.addEventListener("click", () => {
  const menu = document.getElementById("universe-menu");
  if (menu) menu.remove();
});


// ============================
// EFFETS CARTES (Marvel Rivals)
// ============================
function initCardEffects() {
  document.querySelectorAll(".character-card").forEach(card => {
    let isHovering = false;

    card.addEventListener("mouseenter", () => {
      isHovering = true;
      card.classList.add("flash");

      card.style.transition = "transform 0.12s ease-out";
      card.style.transform = "scale(1.12) rotateX(4deg) rotateY(-4deg)";

      setTimeout(() => {
        if (!isHovering) return;
        card.style.transform = "scale(1.1)";
      }, 90);

      setTimeout(() => card.classList.remove("flash"), 350);
    });

    card.addEventListener("mousemove", e => {
      if (!isHovering) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 40;
      const rotateX = (0.5 - y) * 30;

      card.style.transform =
        `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.1)`;
    });

    card.addEventListener("mouseleave", () => {
      isHovering = false;
      card.style.transition = "transform 0.25s ease";
      card.style.transform = "scale(1)";
    });
  });
}
  
// ============================
// MENU DÉROULANT APPARTENANCE
// ============================

filterTypeBtn.addEventListener("click", () => {

  // Supprime ancien menu si existe
  const existing = document.getElementById("type-menu");
  if (existing) {
    existing.remove();
    return;
  }

  const ul = document.createElement("ul");
  ul.id = "type-menu";

  // Bouton Tous
  const liAll = document.createElement("li");
  liAll.textContent = "Tous";
  liAll.addEventListener("click", () => {
    displayCharacters(allCharacters);
    ul.remove();
  });
  ul.appendChild(liAll);

  // Types uniques
  const typeList = [...new Set(allCharacters.map(c => c.type))];

  typeList.forEach(type => {
    const li = document.createElement("li");
    li.textContent = type;
    li.addEventListener("click", () => {
      const filtered = allCharacters.filter(c => c.type === type);
      displayCharacters(filtered);
      ul.remove();
    });
    ul.appendChild(li);
  });

  filterTypeBtn.appendChild(ul);
});
