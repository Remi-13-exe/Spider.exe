document.addEventListener("DOMContentLoaded", async () => {

  /* ------------------------------------------------------ */
  /* RÉCUPÉRATION DE L’ID DU PERSONNAGE DANS L’URL          */
  /* ------------------------------------------------------ */
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // ex: character-detail.html?id=12

  /* ------------------------------------------------------ */
  /* SÉLECTION DU CONTENEUR + MESSAGE DE CHARGEMENT         */
  /* ------------------------------------------------------ */
  const container = document.querySelector(".character-detail");
  container.innerHTML = `<p>Chargement du personnage...</p>`;

  try {

    /* ------------------------------------------------------ */
    /* REQUÊTE API POUR RÉCUPÉRER LES DÉTAILS DU PERSONNAGE   */
    /* ------------------------------------------------------ */
    const res = await fetch(`http://localhost:3000/api/characters/${id}/details`);
    if (!res.ok) throw new Error("Erreur API"); // si erreur HTTP

    const char = await res.json(); // données complètes du personnage

    /* ------------------------------------------------------ */
    /* CONSTRUCTION DU HTML AVEC LES DONNÉES DU PERSONNAGE    */
    /* ------------------------------------------------------ */
    container.innerHTML = `
<div class="character-header">

  <!-- IMAGE DU PERSONNAGE -->
  <img src="${char.image_url}" alt="${char.name}">

  <!-- INFORMATIONS PRINCIPALES -->
  <div class="character-info">
    <h1>
      ${char.name}
      <span class="character-universe">${char.universe || "N/A"}</span>
    </h1>

    <!-- BADGE / TYPE -->
    <div class="info-row">
      <h2>Badge:</h2>
      <p><span class="badge">${char.type || "N/A"}</span></p>
    </div>

    <!-- ALIAS -->
    <div class="info-row">
      <h2>Alias:</h2>
      <p>${char.alias || "N/A"}</p>
    </div>

    <!-- ANNÉE DE CRÉATION -->
    <div class="info-row">
      <h2>Premiere apparition:</h2>
      <p>${char.creation_year || "N/A"}</p>
    </div>

    <!-- CRÉATEURS (liste jointe par virgules) -->
    <div class="info-row">
      <h2>Createurs:</h2>
      <p>${char.creators?.map(c => c.name).join(", ") || "N/A"}</p>
    </div>
  </div>
</div>

<!-- BIOGRAPHIE -->
<div class="biography">
  <h3>Biographie</h3>
  <p>${char.biography || "Aucune biographie disponible."}</p>
</div>

<!-- POUVOIRS -->
<div class="powers">
  <h3>Pouvoirs & Competences</h3>
  <ul>
    ${char.powers.map(p => `<li>${p.name}</li>`).join("")}
  </ul>
</div>

<!-- APPARITIONS -->
<div class="appearances">
  <h3>Apparitions IconIques</h3>
  <ul>
    ${char.appearances.map(a => `<li>${a.title}</li>`).join("")}
  </ul>
</div>

<!-- BOUTON RETOUR -->
<button class="back-btn" onclick="window.history.back()"> Revenir</button>
    `;

  } catch (err) {

    /* ------------------------------------------------------ */
    /* ERREUR API OU PROBLÈME DE CHARGEMENT                   */
    /* ------------------------------------------------------ */
    container.innerHTML = `<p>Impossible de charger le personnage ⚡</p>`;
    console.error(err);
  }
});
