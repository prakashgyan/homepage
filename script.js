// const welcomeText = document.getElementById('welcome-text');
// document.addEventListener('DOMContentLoaded', () => {
//     const welcomeText = document.getElementById('welcome-text');
//     const socialLinks = document.querySelector('.social-links');

//     // Function to trigger animations
//     const animateElements = () => {
//         welcomeText.style.opacity = '1'; // Make the welcome text visible
//         welcomeText.style.transform = 'translateY(0)'; // Move it into place
        
//         // After the welcome text transition, show social links
//         setTimeout(() => {
//             socialLinks.classList.add('visible'); // Add the visible class
//         }, 500); // Match this with the transition duration
//     };

//     animateElements(); // Call the function to start animations
// });

// // Function to show the welcome text
// function showWelcomeText() {
//     welcomeText.style.opacity = 1;
//     welcomeText.style.transform = "translateY(0)";
// }

// // Call the function to show the text after a brief delay (or based on an event)
// setTimeout(showWelcomeText, 500); // Adjust the delay as needed

// // List of "Welcome" in different languages
// const languages = [
//     "Welcome",       // English
//     "Bienvenue",     // French
//     "Willkommen",    // German
//     "Bienvenido",    // Spanish
//     "Benvenuto",     // Italian
//     "欢迎",          // Chinese
//     "Добро пожаловать", // Russian
//     "स्वागत है",     // Hindi
//     "ようこそ",       // Japanese
//     "환영합니다",     // Korean
// ];

// // Function to cycle through languages
// let currentLanguageIndex = 0;


// function changeLanguage() {
//     currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
//     welcomeText.style.opacity = 0;
//     welcomeText.style.transform = "translateY(20px)"; // Move down when fading out

//     setTimeout(() => {
//         welcomeText.innerText = languages[currentLanguageIndex];
//         welcomeText.style.opacity = 1;
//         welcomeText.style.transform = "translateY(0)"; // Move back to normal when fading in
//     }, 500);
// }


// // Change language every 3 seconds after the initial welcome display
// setInterval(changeLanguage, 3500); // Start cycling immediately


const welcomeText = document.getElementById('welcome-text');
const socialLinks = document.querySelector('.social-links');

// List of "Welcome" in different languages
const languages = [
    "Welcome",
    "सुस्वागतम्", // Sanskrit (Devanagari script)
    "Bienvenida",       // Spanish (Latin script)
    "Welkom",           // Dutch (Latin script)
    "歡迎",   // Traditional Chinese (Chinese characters)
    "مرحبا", // Arabic (Arabic script)
    "Bienvenue",        // French (Latin script)
    "Velkommen",        // Danish (Latin script)
    "Добро пожаловать" , // Russian (Cyrillic script)
    "환영합니다", // Korean (Hangul script)
    "Bienvenida",       // Spanish (Latin script)
    "Välkommen",        // Swedish (Latin script)
    "Tervetuloa",       // Finnish (Latin script)
    "Kalimera",         // Greek (Greek script)
    "Welkom",           // Dutch (Latin script)
    "Aloha",            // Hawaiian (Latin script)
    "Benvenuto",        // Italian (Latin script)
    "Hoşgeldiniz",      // Turkish (Latin script)
    "Ciao",             // Italian (Latin script)
    "Laipni lūdzam",    // Latvian (Latin script)
    "Saudação",         // Portuguese (Latin script)
    "欢迎",   // Simplified Chinese (Chinese characters)
    "Hoşgeldiniz",      // Turkish (Latin script)
    "Shalom",           // Hebrew (Hebrew script)
    "Benvenuto",        // Italian (Latin script)
    "Ciao"              // Italian (Latin script)
];

let currentLanguageIndex = 0;

// Function to trigger initial animations
const animateElements = () => {
    welcomeText.style.opacity = '1'; // Make the welcome text visible
    welcomeText.style.transform = 'translateY(0)'; // Move it into place

    // Show social links after a delay
    setTimeout(() => {
        socialLinks.classList.add('visible'); // Add the visible class
    }, 1000); // Match this with the transition duration
};

// Function to show the welcome text
const showWelcomeText = () => {
    welcomeText.style.opacity = 1;
    welcomeText.style.transform = "translateY(0)";
};

// Function to change the welcome text language
const changeLanguage = () => {
    currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
    welcomeText.style.opacity = 0;
    welcomeText.style.transform = "translateY(20px)"; // Move down when fading out

    setTimeout(() => {
        welcomeText.innerText = languages[currentLanguageIndex];
        welcomeText.style.opacity = 1;
        welcomeText.style.transform = "translateY(0)"; // Move back to normal when fading in
    }, 500);
};

// Start the animations after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateElements(); // Call the function to start animations
    setTimeout(showWelcomeText, 500); // Delay to show the welcome text
    setInterval(changeLanguage, 3500); // Change language every 3.5 seconds
});
