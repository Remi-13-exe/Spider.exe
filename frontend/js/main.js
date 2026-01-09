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
