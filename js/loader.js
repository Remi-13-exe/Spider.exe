// Liste complète des images à précharger
const imagesToLoad = [
  "assets/images/amazing_spiderman_game.jpg",
  "assets/images/andrew_garfield.jpg",
  "assets/images/ben_reilly.jpg",
  "assets/images/brand-new-day-image.jpg",
  "assets/images/Couverture Daily Bugle Spider-Man.jpg",
  "assets/images/couverture.png",
  "assets/images/couverture.webp",
  "assets/images/dailybugle couverture.png",
  "assets/images/danny seagren.png",
  "assets/images/fond-spiderman.png",
  "assets/images/Journal Spider-Man Daily Bugle.png",
  "assets/images/miguel_ohara.jpg",
  "assets/images/miles_morales_ps.jpg",
  "assets/images/miles_morales_spiderverse.jpg",
  "assets/images/miles_morales.jpg",
  "assets/images/peter_parker_animated.jpg",
  "assets/images/peter_parker_ps.jpg",
  "assets/images/peter_parker_spectacular.jpg",
  "assets/images/Peter_parker.jpg",
  "assets/images/peter-parker-contact.jpg",
  "assets/images/sky-spiderman.jpg",
  "assets/images/spider-icons.jpg",
  "assets/images/spiderman (2).gif",
  "assets/images/spiderman Noir.jpg",
  "assets/images/spiderman-2-png.jpg",
  "assets/images/tobey_maguire.jpg",
  "assets/images/tom_holland.jpg",
  "assets/images/tom-holland-blesser.jpg"
];

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
let loadedCount = 0;

function updateProgress() {
  loadedCount++;
  const percent = Math.round((loadedCount / imagesToLoad.length) * 100);
  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "%";

  if (loadedCount === imagesToLoad.length) {
    setTimeout(() => {
      window.location.href = "main.html";
    }, 500); // délai pour voir 100%
  }
}

// Préchargement des images
imagesToLoad.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = updateProgress;
  img.onerror = updateProgress;
});