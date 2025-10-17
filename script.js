document.addEventListener('DOMContentLoaded', () => {
    const welcomeText = document.getElementById('welcome-text');
    const socialLinks = document.querySelector('.social-links');

    // List of "Welcome" in different languages, with duplicates removed for a unique cycle.
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
        "Välkommen",        // Swedish (Latin script)
        "Tervetuloa",       // Finnish (Latin script)
        "Kalimera",         // Greek (Greek script)
        "Aloha",            // Hawaiian (Latin script)
        "Benvenuto",        // Italian (Latin script)
        "Hoşgeldiniz",      // Turkish (Latin script)
        "Ciao",             // Italian (Latin script)
        "Laipni lūdzam",    // Latvian (Latin script)
        "Saudação",         // Portuguese (Latin script)
        "欢迎",   // Simplified Chinese (Chinese characters)
        "Shalom"            // Hebrew (Hebrew script)
    ];

    let currentLanguageIndex = 0;

    // Function to trigger initial animations
    const showElements = () => {
        welcomeText.classList.add('welcome-text-visible');

        // After the welcome text transition, show social links
        setTimeout(() => {
            socialLinks.classList.add('visible');
        }, 500); // Match this with the transition duration
    };

    // Function to change the welcome text language
    const changeLanguage = () => {
        currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
        welcomeText.classList.remove('welcome-text-visible');

        setTimeout(() => {
            welcomeText.innerText = languages[currentLanguageIndex];
            welcomeText.classList.add('welcome-text-visible');
        }, 500); // Corresponds to the CSS transition time
    };

    // Start animations
    showElements();

    // Change language every 3.5 seconds
    setInterval(changeLanguage, 3500);
});