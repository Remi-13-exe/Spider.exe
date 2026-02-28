// ============================
// FILTRES
// ============================

// Bouton principal "Filtres"
const filterBtn = document.getElementById("filterBtn");

// Popup contenant les filtres
const filtersPopup = document.getElementById("filtersPopup");

// Boutons individuels pour filtrer par univers et par type
const filterUniverseBtn = document.getElementById("filterUniverse");
const filterTypeBtn = document.getElementById("filterType");

// Tableau global contenant tous les personnages (utile pour filtrer)
let allCharacters = [];

// Ouverture / fermeture du popup de filtres
filterBtn.addEventListener("click", () => {
  filtersPopup.style.display =
    filtersPopup.style.display === "flex" ? "none" : "flex";
});


// ============================
// CHARGEMENT DES PERSONNAGES
// ============================

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("characters-grid");
  if (!grid) return; // sécurité si la grille n'existe pas

  try {
    // Récupération des personnages depuis l'API
    const res = await fetch("http://localhost:3000/api/characters");
    allCharacters = await res.json();

    // Affichage initial de tous les personnages
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
  grid.innerHTML = ""; // reset de la grille

  characters.forEach(char => {
    const card = document.createElement("article");
    card.className = "character-card";

    // Structure HTML d'une carte personnage
    card.innerHTML = `
      <div class="character-img-wrapper">
        <img src="${char.image_url}" alt="${char.name}">
      </div>
      <h2 class="character-name">${char.name}</h2>
      <div class="character-meta">
        <span class="badge">${char.universe}</span>
      </div>
    `;

    // 🔥 Clic sur la carte → page personnage
    card.addEventListener("click", () => {
      window.location.href = `character-detail.html?id=${char.id}`;
    });

    grid.appendChild(card);
  });

  // Active les effets 3D sur les cartes
  initCardEffects();
}


// ============================
// FONCTIONS UTILITAIRES POUR LES MENUS
// ============================

// Ferme un menu déroulant déjà ouvert
function closeDropdown() {
  const existing = document.querySelector(".dropdown-menu");
  if (existing) existing.remove();
}

// Crée un menu déroulant sous un bouton
function createDropdown(items, filterCallback, parentButton) {
  closeDropdown(); // évite les doublons

  const ul = document.createElement("ul");
  ul.className = "dropdown-menu";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;

    // Lorsqu'on clique sur un élément du menu
    li.addEventListener("click", () => {
      filterCallback(item); // applique le filtre
      ul.remove(); // ferme le menu
    });

    ul.appendChild(li);
  });

  parentButton.appendChild(ul);
}


// ============================
// MENU DÉROULANT — FILTRE PAR UNIVERS
// ============================

filterUniverseBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // empêche la fermeture immédiate

  // Liste des univers uniques + "Tous"
  const universList = [
    "Tous",
    ...new Set(allCharacters.map(c => c.universe))
  ];

  createDropdown(universList, (selected) => {
    if (selected === "Tous") {
      displayCharacters(allCharacters);
    } else {
      const filtered = allCharacters.filter(c => c.universe === selected);
      displayCharacters(filtered);
    }
  }, filterUniverseBtn);
});


// ============================
// MENU DÉROULANT — FILTRE PAR TYPE (Héros, Vilain, etc.)
// ============================

filterTypeBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  // Liste des types uniques + "Tous"
  const typeList = [
    "Tous",
    ...new Set(allCharacters.map(c => c.type).filter(Boolean))
  ];

  createDropdown(typeList, (selected) => {
    if (selected === "Tous") {
      displayCharacters(allCharacters);
    } else {
      const filtered = allCharacters.filter(c => c.type === selected);
      displayCharacters(filtered);
    }
  }, filterTypeBtn);
});


// ============================
// FERMETURE DU MENU SI CLIC AILLEURS
// ============================

document.addEventListener("click", () => {
  closeDropdown();
});


// ============================
// EFFETS 3D SUR LES CARTES (style Marvel Rivals)
// ============================

function initCardEffects() {
  document.querySelectorAll(".character-card").forEach(card => {
    let isHovering = false;

    // Entrée du hover → flash + rotation + zoom
    card.addEventListener("mouseenter", () => {
      isHovering = true;
      card.classList.add("flash");

      card.style.transition = "transform 0.12s ease-out";
      card.style.transform = "scale(1.12) rotateX(4deg) rotateY(-4deg)";

      // Stabilisation après l'effet initial
      setTimeout(() => {
        if (!isHovering) return;
        card.style.transform = "scale(1.1)";
      }, 90);

      setTimeout(() => card.classList.remove("flash"), 350);
    });

    // Mouvement de souris → rotation dynamique
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

    // Sortie du hover → reset
    card.addEventListener("mouseleave", () => {
      isHovering = false;
      card.style.transition = "transform 0.25s ease";
      card.style.transform = "scale(1)";
    });
  });
}


// ============================
// EFFET SCROLL SUR LE BADGE DU TITRE
// ============================

const badge = document.querySelector('.title-badge');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    badge.classList.add('scrolled'); // badge devient compact
  } else {
    badge.classList.remove('scrolled'); // badge normal
  }
});
