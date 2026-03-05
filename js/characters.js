// ============================
// VARIABLES GLOBALES
// ============================

// Boutons et menus
const filterBtn = document.getElementById("filterBtn");
const filtersPopup = document.getElementById("filtersPopup");
const filterUniverseBtn = document.getElementById("filterUniverse");
const filterTypeBtn = document.getElementById("filterType");

// Tableau global des personnages
let allCharacters = [];

// ============================
// OUVERTURE / FERMETURE POPUP
// ============================
filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  filtersPopup.style.display =
    filtersPopup.style.display === "flex" ? "none" : "flex";
});

// ============================
// FERMETURE SI CLIC HORS MENU
// ============================
document.addEventListener("click", () => {
  closeDropdown();
});

// ============================
// CHARGEMENT DES PERSONNAGES
// ============================
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("characters-grid");
  if (!grid) return;

  try {
    const res = await fetch("https://spider-exe.onrender.com/api/characters");
    allCharacters = await res.json();
    displayCharacters(allCharacters);
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="error">Erreur de chargement des personnages 🕷️</p>`;
  }
});

// ============================
// AFFICHAGE DES PERSONNAGES
// ============================
function displayCharacters(characters) {
  const grid = document.getElementById("characters-grid");
  grid.innerHTML = "";

  characters.forEach((char) => {
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

    // 🔥 Clic sur la carte → détail personnage
    card.addEventListener("click", () => {
      window.location.href = `character-detail.html?id=${char.id}`;
    });

    grid.appendChild(card);
  });

  // Active effets 3D sur les cartes
  initCardEffects();
}

// ============================
// FONCTIONS DROPDOWN
// ============================
function closeDropdown() {
  const existing = document.querySelector(".dropdown-menu");
  if (existing) existing.remove();
}

function createDropdown(items, filterCallback, parentButton) {
  closeDropdown();

  const ul = document.createElement("ul");
  ul.className = "dropdown-menu";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;

    li.addEventListener("click", () => {
      filterCallback(item);
      ul.remove();
    });

    ul.appendChild(li);
  });

  parentButton.appendChild(ul);
}

// ============================
// FILTRE PAR UNIVERS
// ============================
filterUniverseBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const universList = ["Tous", ...new Set(allCharacters.map(c => c.universe))];

  createDropdown(universList, (selected) => {
    if (selected === "Tous") displayCharacters(allCharacters);
    else displayCharacters(allCharacters.filter(c => c.universe === selected));
  }, filterUniverseBtn);
});

// ============================
// FILTRE PAR TYPE
// ============================
filterTypeBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const typeList = ["Tous", ...new Set(allCharacters.map(c => c.type).filter(Boolean))];

  createDropdown(typeList, (selected) => {
    if (selected === "Tous") displayCharacters(allCharacters);
    else displayCharacters(allCharacters.filter(c => c.type === selected));
  }, filterTypeBtn);
});

// ============================
// EFFETS 3D SUR CARTES
// ============================
function initCardEffects() {
  document.querySelectorAll(".character-card").forEach(card => {
    let isHovering = false;

    card.addEventListener("mouseenter", () => {
      isHovering = true;
      card.classList.add("flash");
      card.style.transition = "transform 0.12s ease-out";
      card.style.transform = "scale(1.12) rotateX(4deg) rotateY(-4deg)";
      setTimeout(() => { if (isHovering) card.style.transform = "scale(1.1)"; }, 90);
      setTimeout(() => card.classList.remove("flash"), 350);
    });

    card.addEventListener("mousemove", e => {
      if (!isHovering) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 40;
      const rotateX = (0.5 - y) * 30;
      card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.1)`;
    });

    card.addEventListener("mouseleave", () => {
      isHovering = false;
      card.style.transition = "transform 0.25s ease";
      card.style.transform = "scale(1)";
    });
  });
}

// ============================
// SCROLL EFFET SUR BADGE
// ============================
const badge = document.querySelector('.title-badge');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) badge.classList.add('scrolled');
  else badge.classList.remove('scrolled');
});