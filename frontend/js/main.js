const searchInput = document.getElementById('site-search');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.toLowerCase();

  if (query.length < 2) return;

  const res = await fetch('http://localhost:3000/api/characters');
  const characters = await res.json();

  const filtered = characters.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.alias?.toLowerCase().includes(query)
  );

  console.log(filtered); // prêt à afficher plus tard
});

// Sélectionner les éléments
const burger = document.querySelector('.burger');
const nav = document.querySelector('.navbar nav');

// Toggle le menu au clic
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
});

// Fermer le menu si on clique sur un lien
const navLinks = document.querySelectorAll('.navbar nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
  if (!burger.contains(e.target) && !nav.contains(e.target)) {
    burger.classList.remove('active');
    nav.classList.remove('active');
  }
});