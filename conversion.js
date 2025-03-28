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
let currentInfoIndex = 0;

function changeCategory(category) {
    const title = document.getElementById("categoryTitle");
    title.textContent = category.charAt(0).toUpperCase() + category.slice(1) + " Converter";

    loadUnits(category);
    currentInfoIndex = 0;
    document.getElementById("infoText").textContent = getFactByIndex(category, currentInfoIndex);
}

// 🧠 Fun Facts (Including Conversion Facts)
const facts = {
    length: [
        "The Great Wall of China is over 21,000 km long!",
        "1 mile is equal to 1,609.34 meters.",
        "1 inch is exactly 2.54 centimeters.",
        "The Eiffel Tower is 330 meters tall, about 1,083 feet!",
        "The distance from Earth to the Moon is about 384,400 km.",
        "The Burj Khalifa, the tallest building in the world, stands at 828 meters."
    ],
    weight: [
        "The heaviest pumpkin ever recorded weighed 2,702 lbs!",
        "1 kilogram is equal to 2.20462 pounds.",
        "An elephant can weigh up to 6,000 kg, which is over 13,000 pounds!",
        "Gold is about 19 times heavier than water.",
        "A cloud can weigh over 500,000 kg (or 1.1 million lbs).",
        "The largest recorded blue whale weighed about 199,000 kg (almost 440,000 lbs)."
    ],
    temperature: [
        "The coldest temperature recorded on Earth is -128.6°F in Antarctica!",
        "Water boils at 100°C or 212°F.",
        "Normal human body temperature is around 37°C (98.6°F).",
        "Mercury is the only metal that is liquid at room temperature.",
        "The sun's core reaches temperatures of about 15 million °C!"
    ],
    volume: [
        "A gallon of water weighs about 8.34 lbs!",
        "1 liter is equal to 1,000 milliliters.",
        "Your lungs can hold about 6 liters of air!",
        "The Amazon River discharges about 209,000 cubic meters of water per second.",
        "The largest swimming pool in the world holds 250 million liters of water."
    ],
    speed: [
        "The fastest land animal is the cheetah, reaching speeds of up to 120 km/h!",
        "1 mph is equal to 1.60934 km/h.",
        "The fastest recorded human speed is 44.72 km/h, achieved by Usain Bolt.",
        "The speed of sound is approximately 343 meters per second.",
        "The speed of light is about 299,792,458 meters per second!"
    ],
    energy: [
        "A bolt of lightning releases about 1 billion joules of energy!",
        "1 calorie is equal to 4.184 joules.",
        "The human body burns about 2,000 kilocalories per day on average.",
        "One gram of uranium-235 can release as much energy as 3 tons of coal.",
        "A single AA battery stores about 9,000 joules of energy."
    ],
    time: [
        "A day on Venus lasts longer than a year on Venus!",
        "1 minute is equal to 60 seconds.",
        "It takes 8 minutes and 20 seconds for sunlight to reach Earth.",
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

// 🔢 Conversion Logic
const conversionRates = {
    length: {
        meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000, mile: 0.000621371,
        yard: 1.09361, foot: 3.28084, inch: 39.3701
    },
    weight: {
        kilogram: 1, gram: 1000, milligram: 1000000, pound: 2.20462, ounce: 35.274
    },
    volume: {
        liter: 1, milliliter: 1000, gallon: 0.264172, quart: 1.05669, pint: 2.11338
    },
    speed: {
        "meters per second": 1, "kilometers per hour": 3.6, "miles per hour": 2.23694,
        knots: 1.94384, "feet per second": 3.28084
    },
    energy: {
        joule: 1, kilojoule: 0.001, calorie: 0.239006, kilocalorie: 0.000239006,
        watt_hour: 0.000277778, kilowatt_hour: 0.000000277778
    },
    time: {
        second: 1, minute: 1 / 60, hour: 1 / 3600, day: 1 / 86400, week: 1 / 604800
    }
};

// 📌 Load Unit Options
function loadUnits(category) {
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    if (category === "temperature") {
        ["Celsius", "Fahrenheit", "Kelvin"].forEach(unit => {
            fromUnit.appendChild(new Option(unit, unit.toLowerCase()));
            toUnit.appendChild(new Option(unit, unit.toLowerCase()));
        });
    } else {
        for (const unit in conversionRates[category]) {
            fromUnit.appendChild(new Option(unit, unit));
            toUnit.appendChild(new Option(unit, unit));
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
        const result = (inputValue * conversionRates[category][toUnit]) / conversionRates[category][fromUnit];
        resultSpan.textContent = result.toFixed(4);
    }
}

// 🌡 Temperature Conversion Logic
function convertTemperature(value, from, to) {
    if (from === to) return value.toFixed(2);

    return from === "celsius" && to === "fahrenheit" ? (value * 9/5 + 32).toFixed(2) :
           from === "fahrenheit" && to === "celsius" ? ((value - 32) * 5/9).toFixed(2) :
           from === "kelvin" && to === "celsius" ? (value - 273.15).toFixed(2) :
           from === "celsius" && to === "kelvin" ? (value + 273.15).toFixed(2) : "Invalid";
}

// 🔄 Initialize Page on Load
document.addEventListener("DOMContentLoaded", () => {
    changeCategory("length");
});
