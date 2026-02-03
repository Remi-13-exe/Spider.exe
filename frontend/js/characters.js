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
