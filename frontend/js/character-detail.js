document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const container = document.querySelector(".character-detail");
  container.innerHTML = `<p>Chargement du personnage...</p>`;

  try {
    const res = await fetch(`http://localhost:3000/api/characters/${id}/details`);
    if (!res.ok) throw new Error("Erreur API");
    const char = await res.json();

    container.innerHTML = `
<div class="character-header">
  <img src="${char.image_url}" alt="${char.name}">

  <div class="character-info">
    <h1>
      ${char.name}
      <span class="character-universe">${char.universe || "N/A"}</span>
    </h1>

    <div class="info-row">
      <h2>Badge:</h2>
      <p><span class="badge">${char.type || "N/A"}</span></p>
    </div>

    <div class="info-row">
      <h2>Alias:</h2>
      <p>${char.alias || "N/A"}</p>
    </div>

    <div class="info-row">
      <h2>Premiere apparition:</h2>
      <p>${char.creation_year || "N/A"}</p>
    </div>

    <div class="info-row">
      <h2>Createurs:</h2>
      <p>${char.creators?.map(c => c.name).join(", ") || "N/A"}</p>
    </div>
  </div>
</div>


      <div class="biography">
        <h3>Biographie</h3>
        <p>${char.biography || "Aucune biographie disponible."}</p>
      </div>

      <div class="powers">
        <h3>Pouvoirs & Competences</h3>
        <ul>
          ${char.powers.map(p => `<li>${p.name}</li>`).join("")}
        </ul>
      </div>

      <div class="appearances">
        <h3>Apparitions IconIques</h3>
        <ul>
          ${char.appearances.map(a => `<li>${a.title}</li>`).join("")}
        </ul>
      </div>

<button class="back-btn" onclick="window.history.back()"> Revenir</button>
    `;
  } catch (err) {
    container.innerHTML = `<p>Impossible de charger le personnage ⚡</p>`;
    console.error(err);
  }
});
