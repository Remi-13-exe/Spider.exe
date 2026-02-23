// Initialisation EmailJS
(function () {
  emailjs.init("6FIWD6cvnB4w-6w7r");
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("contactSuccess");

  if (!form || !successBox) {
    console.error("Formulaire ou message de succès introuvable");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = form.querySelector('input[name="email"]').value;
    const emailConfirm = document.getElementById("emailConfirm").value;

    // Vérification email
    if (email !== emailConfirm) {
      alert("Les emails ne correspondent pas.");
      return;
    }

    // Envoi EmailJS
    emailjs.sendForm(
      "service_b26c37d",
      "template_tukmjwk",
      form
    ).then(() => {

      // Cache le formulaire
      form.style.display = "none";

      // Affiche le message de succès
      successBox.classList.remove("hidden");

    }).catch((error) => {
      console.error("EmailJS error:", error);
      alert("Erreur lors de l'envoi du message.");
    });
  });
});
