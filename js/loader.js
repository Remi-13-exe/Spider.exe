// Loader dynamique pour toutes les images du projet Spider.exe

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  let loadedCount = 0;

  // 1️⃣ Récupère toutes les images à précharger
  // Images présentes dans le DOM (cartes, contenu HTML)
  const dynamicImages = Array.from(document.querySelectorAll(".card img, img[data-preload]")).map(img => img.src);

  // Images statiques ou non encore dans le DOM
  const staticImages = [
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

  // Fusion des deux tableaux en retirant les doublons
  const imagesToLoad = [...new Set([...dynamicImages, ...staticImages])];

  const totalImages = imagesToLoad.length;

  // 2️⃣ Fonction de mise à jour du loader
  function updateProgress() {
    loadedCount++;
    const percent = Math.round((loadedCount / totalImages) * 100);
    if (progressBar) progressBar.style.width = percent + "%";
    if (progressText) progressText.textContent = percent + "%";

    // Quand toutes les images sont chargées, on passe à la page principale
    if (loadedCount === totalImages) {
      setTimeout(() => {
        window.location.href = "main.html";
      }, 500); // petit délai pour voir le 100%
    }
  }

  // 3️⃣ Préchargement des images
  imagesToLoad.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = updateProgress;
    img.onerror = updateProgress; // pour ne pas bloquer si une image ne charge pas
  });

});
