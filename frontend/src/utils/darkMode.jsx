const htmlElement = document.documentElement;

// Check if the user prefers dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  htmlElement.classList.add('dark');
}

// Optional: Listen for changes in the user's preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (e.matches) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }
});
