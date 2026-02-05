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
});
