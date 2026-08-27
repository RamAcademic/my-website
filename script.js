/* =========================================================
   MR. RAMESH — WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LIGHT / DARK MODE
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    const html = document.documentElement;
    const body = document.body;


    function applyTheme(theme) {

        const isDark = theme === "dark";

        /* Apply class to both HTML and BODY */
        html.classList.toggle("dark-mode", isDark);
        body.classList.toggle("dark-mode", isDark);


        /* Update theme button */
        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-pressed",
                isDark ? "true" : "false"
            );

            themeToggle.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );
        }
    }


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        applyTheme("dark");

    } else {

        /* Default = LIGHT MODE */

        applyTheme("light");
    }


    /* =====================================================
       THEME BUTTON
    ===================================================== */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const darkMode =
                    body.classList.contains("dark-mode");


                if (darkMode) {

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

            }
        );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            function () {

                navLinks.classList.toggle("active");

                menuToggle.classList.toggle("active");


                const expanded =
                    menuToggle.classList.contains("active");


                menuToggle.setAttribute(
                    "aria-expanded",
                    expanded ? "true" : "false"
                );

            }
        );


        /* Close menu after navigation click */

        const links =
            navLinks.querySelectorAll("a");


        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "active"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(".header");


    function updateHeader() {

        if (!header) {
            return;
        }


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


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                const target =
                    link.getAttribute("href");


                if (
                    target ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

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

    navigationLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const target =
                        link.getAttribute("href");


                    if (
                        target &&
                        target.startsWith("#")
                    ) {

                        const element =
                            document.querySelector(
                                target
                            );


                        if (element) {

                            event.preventDefault();


                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }

                }
            );

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!navLinks || !menuToggle) {
                return;
            }


            const clickedMenu =
                navLinks.contains(event.target);


            const clickedButton =
                menuToggle.contains(event.target);


            if (
                !clickedMenu &&
                !clickedButton
            ) {

                navLinks.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       KEEP THEME SYNCHRONIZED BETWEEN TABS
    ===================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (event.key !== "theme") {
                return;
            }


            if (event.newValue === "dark") {

                applyTheme("dark");

            } else {

                applyTheme("light");

            }

        }
    );

});
