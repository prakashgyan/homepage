const welcomeText = document.getElementById('welcome-text');
const socialLinks = document.querySelector('.social-links');

// List of "Welcome" in different languages
const languages = [
    "Welcome",
    "Willkommen",       // German
    "ようこそ",          // Japanese
    "स्वागत है",        // Hindi
    "Bem-vindo",        // Portuguese
    "Chào mừng",        // Vietnamese
    "सुस्वागतम्",        // Sanskrit
    "Bienvenida",       // Spanish
    "Welkom",           // Dutch
    "歡迎",             // Traditional Chinese
    "مرحبا",            // Arabic
    "Bienvenue",        // French
    "Velkommen",        // Danish
    "Добро пожаловать", // Russian
    "환영합니다",        // Korean
    "Välkommen",        // Swedish
    "Tervetuloa",       // Finnish
    "Kalimera",         // Greek
    "Aloha",            // Hawaiian
    "Benvenuto",        // Italian
    "Hoşgeldiniz",      // Turkish
    "Ciao",             // Italian
    "Laipni lūdzam",    // Latvian
    "Shalom",           // Hebrew
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
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * languages.length);
    } while (nextIndex === currentLanguageIndex); // Ensure it's a new language

    currentLanguageIndex = nextIndex;

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
