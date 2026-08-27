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


    /* -----------------------------------------------------
       APPLY THEME
    ----------------------------------------------------- */

    function setTheme(theme) {

        if (theme === "dark") {

            html.classList.add("dark-mode");
            body.classList.add("dark-mode");

            if (themeToggle) {

                themeToggle.setAttribute(
                    "aria-pressed",
                    "true"
                );

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to light mode"
                );
            }

        } else {

            /* LIGHT MODE */

            html.classList.remove("dark-mode");
            body.classList.remove("dark-mode");

            if (themeToggle) {

                themeToggle.setAttribute(
                    "aria-pressed",
                    "false"
                );

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to dark mode"
                );
            }
        }

        localStorage.setItem("theme", theme);
    }


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        setTheme("dark");

    } else {

        /* Always start with LIGHT MODE
           if nothing is saved */

        setTheme("light");
    }


    /* =====================================================
       THEME TOGGLE BUTTON
    ===================================================== */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const isDark =
                    body.classList.contains("dark-mode");


                if (isDark) {

                    /* DARK → LIGHT */

                    setTheme("light");

                } else {

                    /* LIGHT → DARK */

                    setTheme("dark");

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
                    menuToggle.classList.contains(
                        "active"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    expanded ? "true" : "false"
                );

            }
        );


        /* -------------------------------------------------
           CLOSE MENU AFTER CLICKING LINK
        ------------------------------------------------- */

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
        document.querySelectorAll(
            "section[id]"
        );


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


            const clickedInsideMenu =
                navLinks.contains(
                    event.target
                );


            const clickedMenuButton =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedMenuButton
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
       SYNCHRONIZE THEME BETWEEN TABS
    ===================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (event.key !== "theme") {
                return;
            }


            if (event.newValue === "dark") {

                setTheme("dark");

            } else {

                setTheme("light");

            }

        }
    );

});
