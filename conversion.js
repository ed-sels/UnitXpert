// 🌟 Sidebar Toggle Function
function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("hidden");
}

// 🌙 Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// 🏠 Navigate to Homepage
function goToHome() {
    window.location.href = "/"; // Replace with actual homepage URL
}

// 📏 Category Change & Fact Update
let currentInfoIndex = 0; // Keep track of the displayed fact index

function changeCategory(category) {
    const title = document.getElementById("categoryTitle");
    title.textContent = category.charAt(0).toUpperCase() + category.slice(1) + " Converter";

    loadUnits(category); // Load units for the selected category

    currentInfoIndex = 0; // Reset index when category changes
    document.getElementById("infoText").textContent = getFactByIndex(category, currentInfoIndex);
}

// 🧠 Fun Facts (Updated with Speed)
const facts = {
    length: [
        "The Great Wall of China is over 21,000 km long!",
        "The longest river in the world is the Nile, stretching 6,650 km.",
        "Mount Everest grows about 4 mm taller every year!",
        "The distance from Earth to the Moon is about 384,400 km.",
        "The Burj Khalifa, the tallest building in the world, stands at 828 meters.",
        "The longest bridge in the world, the Danyang–Kunshan Grand Bridge in China, stretches 164.8 km."
    ],
    weight: [
        "The heaviest pumpkin ever recorded weighed 2,702 lbs!",
        "A blue whale's tongue can weigh as much as an elephant!",
        "Gold is about 19 times heavier than water.",
        "A cloud can weigh over 500,000 kg (or 1.1 million lbs).",
        "The largest recorded blue whale weighed about 199,000 kg (almost 440,000 lbs).",
        "A single cubic meter of gold weighs about 19,300 kg."
    ],
    temperature: [
        "The coldest temperature recorded on Earth is -128.6°F in Antarctica!",
        "Mercury is the only metal that is liquid at room temperature.",
        "The sun's core reaches temperatures of about 15 million °C!",
        "The surface temperature of the Sun is about 5,500°C (9,932°F).",
        "The hottest recorded temperature on Earth was 56.7°C (134°F) in Death Valley, USA.",
        "The coldest recorded temperature on Earth was -128.6°F (-89.2°C) in Antarctica."
    ],
    volume: [
        "A gallon of water weighs about 8.34 lbs!",
        "The Pacific Ocean holds more than half of the Earth's water.",
        "Your lungs can hold about 6 liters of air!",
        "The Amazon River discharges about 209,000 cubic meters of water per second.",
        "The largest swimming pool in the world holds 250 million liters of water.",
        "Your brain is roughly 1.4 liters in volume!"
    ],
    speed: [
        "The fastest land animal is the cheetah, reaching speeds of up to 120 km/h!",
        "The speed of sound is approximately 343 meters per second.",
        "The fastest recorded human speed is 44.72 km/h, achieved by Usain Bolt.",
        "The Peregrine Falcon is the fastest bird, diving at speeds over 389 km/h (242 mph)!",
        "The Bugatti Chiron Super Sport 300+ is the fastest car, reaching 490 km/h (304 mph).",
        "The speed of light is about 299,792,458 meters per second!"
    ],
    energy: [
        "A bolt of lightning releases about 1 billion joules of energy!",
        "The human body burns about 2,000 kilocalories per day on average.",
        "The Sun produces 3.8 x 10^26 watts of power every second.",
        "One gram of uranium-235 can release as much energy as 3 tons of coal.",
        "A single AA battery stores about 9,000 joules of energy.",
        "The Hoover Dam generates about 4 billion kilowatt-hours of electricity per year.",
        "A Big Mac contains around 2.4 million joules (570 kcal) of energy!",
        "One liter of gasoline has about 34 million joules of energy!"
    ],
    time: [
        "A day on Venus lasts longer than a year on Venus!",
        "The shortest war in history lasted only 38-45 minutes (Anglo-Zanzibar War).",
        "It takes 8 minutes and 20 seconds for sunlight to reach Earth.",
        "The oldest known calendar is over 10,000 years old!",
        "There are 31,536,000 seconds in a year.",
        "The human brain processes information in just a few milliseconds.",
        "A year on Neptune lasts 165 Earth years!",
        "The Earth is approximately 4.54 billion years old!"
    ]
};

// 🔄 Get Fact by Index
function getFactByIndex(category, index) {
    return facts[category]?.[index] || "Did you know?";
}

// ➡️ Show Next Fact
function showNextInfo() {
    const category = document.getElementById("categoryTitle").textContent.split(" ")[0].toLowerCase();
    currentInfoIndex = (currentInfoIndex + 1) % facts[category].length;
    document.getElementById("infoText").textContent = getFactByIndex(category, currentInfoIndex);
}

// ⬅️ Show Previous Fact
function showPreviousInfo() {
    const category = document.getElementById("categoryTitle").textContent.split(" ")[0].toLowerCase();
    currentInfoIndex = (currentInfoIndex - 1 + facts[category].length) % facts[category].length;
    document.getElementById("infoText").textContent = getFactByIndex(category, currentInfoIndex);
}

// 🔄 Initialize Page on Load
document.addEventListener("DOMContentLoaded", () => {
    changeCategory("length");
});
