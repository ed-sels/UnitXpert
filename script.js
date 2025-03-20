// Dark Mode Toggle
const toggleButton = document.getElementById("darkModeToggle");

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Change the icon
    if (document.body.classList.contains("dark-mode")) {
        toggleButton.textContent = "☀️";
    } else {
        toggleButton.textContent = "🌙";
    }
});
