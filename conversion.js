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
    window.location.href = "/"; // Replace with the actual homepage URL
}

// 📏 Category Change & Fact Update
function changeCategory(category) {
    const title = document.getElementById("categoryTitle");
    title.textContent = category.charAt(0).toUpperCase() + category.slice(1) + " Converter";

    loadUnits(category); // Load units for the selected category

    document.getElementById("infoText").textContent = getRandomFact(category);
}

// 🧠 Fun Facts Storage (Updated)
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
    energy: [
        "A bolt of lightning releases about 1 billion joules of energy!",
        "The human body burns about 2,000 kilocalories per day on average.",
        "The Sun produces 3.8 x 10^26 watts of power every second.",
        "One gram of uranium-235 can release as much energy as 3 tons of coal.",
        "A single AA battery stores about 9,000 joules of energy.",
        "The Hoover Dam generates about 4 billion kilowatt-hours of electricity per year."
    ],
    time: [
        "A day on Venus lasts longer than a year on Venus!",
        "The shortest war in history lasted only 38-45 minutes (Anglo-Zanzibar War).",
        "It takes 8 minutes and 20 seconds for sunlight to reach Earth.",
        "The oldest known calendar is over 10,000 years old!",
        "There are 31,536,000 seconds in a year.",
        "The human brain processes information in just a few milliseconds."
    ]
};

// 🔄 Get Random Fact for Selected Category
function getRandomFact(category) {
    const categoryFacts = facts[category] || [];
    return categoryFacts[Math.floor(Math.random() * categoryFacts.length)] || "Did you know?";
}

// 🔢 Conversion Logic
const conversionRates = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        pound: 2.20462,
        ounce: 35.274
    },
    temperature: "custom",
    volume: {
        liter: 1,
        milliliter: 1000,
        gallon: 0.264172,
        quart: 1.05669,
        pint: 2.11338
    }
};

// 📌 Load Unit Options Based on Category
function loadUnits(category) {
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    if (category === "temperature") {
        ["Celsius", "Fahrenheit", "Kelvin"].forEach(unit => {
            let option1 = new Option(unit, unit.toLowerCase());
            let option2 = new Option(unit, unit.toLowerCase());
            fromUnit.appendChild(option1);
            toUnit.appendChild(option2);
        });
    } else {
        for (const unit in conversionRates[category]) {
            let option1 = new Option(unit, unit);
            let option2 = new Option(unit, unit);
            fromUnit.appendChild(option1);
            toUnit.appendChild(option2);
        }
    }
}

// 🔄 Conversion Function
function convert() {
    const category = document.getElementById("categoryTitle").textContent.split(" ")[0].toLowerCase();
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    const resultSpan = document.getElementById("result");

    if (isNaN(inputValue)) {
        resultSpan.textContent = "0";
        return;
    }

    if (category === "temperature") {
        resultSpan.textContent = convertTemperature(inputValue, fromUnit, toUnit);
    } else {
        resultSpan.textContent = (inputValue * conversionRates[category][toUnit] / conversionRates[category][fromUnit]).toFixed(4);
    }
}

// 🌡 Temperature Conversion Logic
function convertTemperature(value, from, to) {
    if (from === to) return value;

    let result;

    if (from === "celsius") {
        result = to === "fahrenheit" ? (value * 9/5) + 32 : value + 273.15;
    } else if (from === "fahrenheit") {
        result = to === "celsius" ? (value - 32) * 5/9 : ((value - 32) * 5/9) + 273.15;
    } else if (from === "kelvin") {
        result = to === "celsius" ? value - 273.15 : (value - 273.15) * 9/5 + 32;
    }

    return result.toFixed(2);
}

// ➡️ Show Next Fact
let currentInfoIndex = 0;
function showNextInfo() {
    const category = document.getElementById("categoryTitle").textContent.split(" ")[0].toLowerCase();
    currentInfoIndex = (currentInfoIndex + 1) % facts[category].length;
    document.getElementById("infoText").textContent = facts[category][currentInfoIndex];
}

// ⬅️ Show Previous Fact
function showPreviousInfo() {
    const category = document.getElementById("categoryTitle").textContent.split(" ")[0].toLowerCase();
    currentInfoIndex = (currentInfoIndex - 1 + facts[category].length) % facts[category].length;
    document.getElementById("infoText").textContent = facts[category][currentInfoIndex];
}

// 🖥 Responsive Sidebar for Window Resizing
window.addEventListener("resize", () => {
    const sidebar = document.querySelector(".sidebar");
    if (window.innerWidth > 768) {
        sidebar.classList.remove("hidden");
    } else {
        sidebar.classList.add("hidden");
    }
});

// 🔄 Initialize Page on Load
document.addEventListener("DOMContentLoaded", () => {
    changeCategory("length");
});
