document.addEventListener("DOMContentLoaded", async () => {

  /* =========================
     ELEMENTS HEADER
  ========================= */

  // Champ de recherche
  const searchInput = document.getElementById("site-search");

  // Conteneur des résultats de recherche
  const resultsBox = document.getElementById("search-results");

  // Burger menu (mobile)
  const burger = document.querySelector(".burger");

  // Navigation principale
  const nav = document.querySelector(".navbar nav");



  /* =========================
     BURGER MENU (mobile)
  ========================= */

  if (burger && nav) {

    // Ouvre/ferme le menu au clic sur le burger
    burger.addEventListener("click", (e) => {
      e.stopPropagation(); // empêche la fermeture immédiate
      burger.classList.toggle("active");
      nav.classList.toggle("active");
    });

    // Ferme le menu quand on clique sur un lien
    document.querySelectorAll(".navbar nav a").forEach(link => {
      link.addEventListener("click", () => {
        burger.classList.remove("active");
        nav.classList.remove("active");
      });
    });

    // Ferme le menu si clic en dehors
    document.addEventListener("click", (e) => {
      if (!burger.contains(e.target) && !nav.contains(e.target)) {
        burger.classList.remove("active");
        nav.classList.remove("active");
      }
    });
  }



  /* =========================
     RECHERCHE DYNAMIQUE
  ========================= */

  // Si pas d'input ou pas de conteneur → stop
  if (!searchInput || !resultsBox) return;

  let allCharacters = [];

  try {
    // Récupère tous les personnages une seule fois
    const res = await fetch("https://spider-exe.onrender.com/api/characters");
    allCharacters = await res.json();
  } catch (err) {
    console.error("Erreur chargement personnages", err);
  }

  // Déclenche la recherche à chaque frappe
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    // Reset des résultats
    resultsBox.innerHTML = "";

    // Si moins de 2 lettres → on cache
    if (query.length < 2) {
      resultsBox.classList.add("hidden");
      return;
    }

    // Filtrage des personnages
    const filtered = allCharacters.filter(char =>
      char.name.toLowerCase().includes(query) ||
      char.alias?.toLowerCase().includes(query) ||
      char.universe?.toLowerCase().includes(query)
    );

    // Aucun résultat
    if (filtered.length === 0) {
      resultsBox.innerHTML = `<li class="no-result">Aucun résultat</li>`;
      resultsBox.classList.remove("hidden");
      return;
    }

    // Affichage des résultats
    filtered.forEach(char => {
      const li = document.createElement("li");
      li.classList.add("search-item");

      li.innerHTML = `
        <img
          src="${char.image_url || 'assets/images/placeholder.png'}"
          alt="${char.name}"
          class="search-thumb"
        >
        <div class="search-text">
          <span class="result-name">${char.name}</span>
          ${char.alias ? `<span class="result-alias">(${char.alias})</span>` : ""}
          ${char.universe ? `<span class="result-universe">${char.universe}</span>` : ""}
        </div>
      `;

      // Clic → page du personnage
      li.addEventListener("click", () => {
        window.location.href = `character-detail.html?id=${char.id}`;
      });

      resultsBox.appendChild(li);
    });

    resultsBox.classList.remove("hidden");
  });



  /* =========================
     FERMETURE SEARCH AU CLIC EXTERNE
  ========================= */

  document.addEventListener("click", (e) => {
    // Si clic en dehors de la zone de recherche → on cache
    if (!e.target.closest(".search-box")) {
      resultsBox.classList.add("hidden");
    }
  });



  /* =========================
     PLACEHOLDER ANIMÉ
  ========================= */

  const placeholderText = "Rechercher un personnage...";
  let i = 0;

  function animatePlaceholder() {

    // L’animation ne tourne que si l’input est vide
    if (!searchInput.value) {
      searchInput.placeholder =
        placeholderText.slice(i) + placeholderText.slice(0, i);

      // Décalage d’un caractère
      i = (i + 1) % placeholderText.length;
    }

    // Animation toutes les 100ms
    setTimeout(animatePlaceholder, 100);
  }

  animatePlaceholder();
});
