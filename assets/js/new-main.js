// Shared client-side functionality for the homepage.
// Currently, it only updates the footer year but can be extended
// in the future for additional interactions (e.g. mobile nav toggles).

document.addEventListener('DOMContentLoaded', () => {
  // Update year in the footer across pages
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});