/* =========================================================
   MR. RAMESH — WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const html = document.documentElement;
    const body = document.body;

    const themeToggle =
        document.getElementById("themeToggle");

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    const header =
        document.querySelector(".header");


    /* =====================================================
       THEME
    ===================================================== */

    function setTheme(theme) {

        const isDark = theme === "dark";

        html.classList.toggle(
            "dark-mode",
            isDark
        );

        body.classList.toggle(
            "dark-mode",
            isDark
        );


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


        localStorage.setItem(
            "theme",
            theme
        );
    }


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("theme");

    setTheme(
        savedTheme === "dark"
            ? "dark"
            : "light"
    );


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isDark =
                    html.classList.contains(
                        "dark-mode"
                    );

                setTheme(
                    isDark
                        ? "light"
                        : "dark"
                );
            }
        );
    }


    /* =====================================================
       MOBILE MENU FUNCTIONS
    ===================================================== */

    function openMobileMenu() {

        if (!navLinks || !menuToggle) {
            return;
        }

        navLinks.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    }


    function closeMobileMenu() {

        if (!navLinks || !menuToggle) {
            return;
        }

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    function toggleMobileMenu() {

        if (!navLinks || !menuToggle) {
            return;
        }

        const isOpen =
            navLinks.classList.contains(
                "active"
            );

        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();
        }
    }


    /* =====================================================
       IMPORTANT:
       ALWAYS START MOBILE MENU CLOSED
    ===================================================== */

    if (navLinks) {
        navLinks.classList.remove("active");
    }

    if (menuToggle) {

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    /* =====================================================
       MOBILE MENU BUTTON
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleMobileMenu();
            }
        );
    }


    /* =====================================================
       MOBILE NAVIGATION LINKS
    ===================================================== */

    if (navLinks) {

        const links =
            navLinks.querySelectorAll("a");

        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMobileMenu();
                    }
                );

            }
        );
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );
        }
    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
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


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 180;

                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionBottom
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );
                }

            }
        );


        navigationLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                const target =
                    link.getAttribute(
                        "href"
                    );


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
        {
            passive: true
        }
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
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !target ||
                        !target.startsWith("#")
                    ) {
                        return;
                    }


                    const element =
                        document.querySelector(
                            target
                        );


                    if (!element) {
                        return;
                    }


                    event.preventDefault();


                    closeMobileMenu();


                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!navLinks || !menuToggle) {
                return;
            }


            const clickedInsideNav =
                navLinks.contains(
                    event.target
                );


            const clickedToggle =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideNav &&
                !clickedToggle
            ) {

                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       CLOSE MENU WITH ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navLinks &&
                navLinks.classList.contains(
                    "active"
                )
            ) {

                closeMobileMenu();
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


            setTheme(
                event.newValue === "dark"
                    ? "dark"
                    : "light"
            );

        }
    );

});
