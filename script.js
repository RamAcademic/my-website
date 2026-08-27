/* =========================================================
   MR. RAMESH — WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LIGHT / DARK MODE
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const root = document.documentElement;
    const body = document.body;

    function applyTheme(theme) {
        const isDark = theme === "dark";

        root.classList.toggle("dark-mode", isDark);
        body.classList.toggle("dark-mode", isDark);

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                isDark ? "true" : "false"
            );
        }
    }

    /* -----------------------------------------------------
       Load saved theme
       Default = LIGHT MODE
    ----------------------------------------------------- */

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    /* -----------------------------------------------------
       Theme button
    ----------------------------------------------------- */

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const darkModeActive =
                body.classList.contains("dark-mode");

            if (darkModeActive) {

                /* DARK → LIGHT */

                applyTheme("light");

                localStorage.setItem(
                    "theme",
                    "light"
                );

            } else {

                /* LIGHT → DARK */

                applyTheme("dark");

                localStorage.setItem(
                    "theme",
                    "dark"
                );
            }

        });

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            menuToggle.classList.toggle("active");

        });

        /* Close mobile menu after clicking a link */

        const navigationLinks =
            navLinks.querySelectorAll("a");

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.classList.remove("active");

            });

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector("header");

    if (header) {

        function updateHeader() {

            if (window.scrollY > 30) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        }

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navItems.forEach(function (link) {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                target === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    navItems.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const target =
                link.getAttribute("href");

            if (
                target &&
                target.startsWith("#")
            ) {

                const element =
                    document.querySelector(target);

                if (element) {

                    event.preventDefault();

                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (!navLinks || !menuToggle) {
            return;
        }

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

        }

    });


    /* =====================================================
       PREVENT THEME FLASH
       Keep theme state synchronized.
    ===================================================== */

    window.addEventListener("storage", function (event) {

        if (event.key === "theme") {

            if (event.newValue === "dark") {

                applyTheme("dark");

            } else {

                applyTheme("light");

            }

        }

    });

});
