/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {
    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    });
});


/* =====================================================
   LIGHT / DARK MODE
===================================================== */

const themeToggle = document.getElementById("themeToggle");


/* Get saved theme */

const savedTheme = localStorage.getItem("theme");


/* Apply saved theme */

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}


/* Toggle Light / Dark */

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const darkMode =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );

    });

}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

window.addEventListener("scroll", function () {

    const header = document.querySelector(".header");

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 25px rgba(11,31,58,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});
