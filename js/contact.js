// ============================
// INITIALISATION EMAILJS
// ============================

// EmailJS doit être initialisé avec ta clé publique
(function () {
  emailjs.init("6FIWD6cvnB4w-6w7r");
})();


// ============================
// CHARGEMENT DU DOM
// ============================

document.addEventListener("DOMContentLoaded", () => {

  // Sélection du formulaire et du message de succès
  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("contactSuccess");

  // Sécurité si un élément manque
  if (!form || !successBox) {
    console.error("Formulaire ou message de succès introuvable");
    return;
  }

  // ============================
  // SOUMISSION DU FORMULAIRE
  // ============================

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // empêche le rechargement de la page

    // Récupération des valeurs email
    const email = form.querySelector('input[name="email"]').value;
    const emailConfirm = document.getElementById("emailConfirm").value;

    // Vérification que les deux emails correspondent
    if (email !== emailConfirm) {
      alert("Les emails ne correspondent pas.");
      return;
    }

    // ============================
    // ENVOI DU FORMULAIRE VIA EMAILJS
    // ============================

    emailjs.sendForm(
      "service_b26c37d",   // ID du service EmailJS
      "template_tukmjwk",  // ID du template EmailJS
      form                 // données du formulaire
    ).then(() => {

      // Cache le formulaire après envoi réussi
      form.style.display = "none";

      // Affiche le message de succès
      successBox.classList.remove("hidden");

    }).catch((error) => {
      // Gestion des erreurs EmailJS
      console.error("EmailJS error:", error);
      alert("Erreur lors de l'envoi du message.");
    });
  });
});
