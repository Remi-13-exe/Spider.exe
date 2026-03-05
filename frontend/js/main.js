// Sélection de l’input de recherche dans la navbar
const searchInput = document.getElementById('site-search');

// Vérifie que l’input existe sur la page
if (searchInput) {

  // Déclenche la recherche à chaque frappe dans l’input
  searchInput.addEventListener('input', async (e) => {

    // Récupère la valeur tapée, en minuscule et sans espaces inutiles
    const query = e.target.value.toLowerCase().trim();

    // Si moins de 2 caractères → on ne lance pas la recherche
    if (query.length < 2) return;

    try {
      // Récupère tous les personnages depuis l’API
      const res = await fetch('https://spider-exe.onrender.com/api/characters');
      const characters = await res.json();

      // Filtre les personnages selon :
      // - leur nom
      // - leur alias (si présent)
      // - leur univers
      const filtered = characters.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.alias?.toLowerCase().includes(query) ||
        c.universe?.toLowerCase().includes(query)
      );

      // Affiche les résultats dans la console (prêt à être affiché dans un menu)
      console.log(filtered);

    } catch (err) {
      // Gestion des erreurs réseau ou API
      console.error("Erreur recherche personnages", err);
    }
  });
}
