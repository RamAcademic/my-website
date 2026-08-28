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

        /* Apply theme */
        html.classList.toggle(
            "dark-mode",
            isDark
        );

        body.classList.toggle(
            "dark-mode",
            isDark
        );


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

    if (savedTheme === "dark") {

        setTheme("dark");

    } else {

        setTheme("light");

    }


    /* =====================================================
       THEME BUTTON
    ===================================================== */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const isDark =
                    html.classList.contains(
                        "dark-mode"
                    );

                if (isDark) {

                    setTheme("light");

                } else {

                    setTheme("dark");

                }

            }
        );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

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

        menuToggle.setAttribute(
            "aria-label",
            "Open Menu"
        );

        navLinks.setAttribute(
            "aria-hidden",
            "true"
        );
    }


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

        menuToggle.setAttribute(
            "aria-label",
            "Close Menu"
        );

        navLinks.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function toggleMobileMenu(event) {

        if (!navLinks || !menuToggle) {
            return;
        }

        if (event) {

            event.preventDefault();
            event.stopPropagation();

        }

        const menuIsOpen =
            navLinks.classList.contains(
                "active"
            );

        if (menuIsOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }
    }


    /* =====================================================
       MOBILE MENU INITIAL STATE

       IMPORTANT:
       MENU MUST BE CLOSED WHEN PAGE LOADS
    ===================================================== */

    closeMobileMenu();


    /* =====================================================
       MOBILE MENU BUTTON
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* =====================================================
       MOBILE NAVIGATION LINKS
    ===================================================== */

    if (navLinks) {

        const links =
            navLinks.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        });

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


        sections.forEach(function (section) {

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

        });


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
       CLOSE MOBILE MENU OUTSIDE
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


            const clickedMenuButton =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideNav &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

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


            if (event.newValue === "dark") {

                setTheme("dark");

            } else {

                setTheme("light");

            }

        }
    );


    /* =====================================================
       QUESTION PAPERS
       ONLY ONE BRANCH OPEN AT A TIME

       CSE → ECE
       CSE closes automatically

       ECE → CIVIL
       ECE closes automatically

       CIVIL → MECHANICAL
       CIVIL closes automatically

       This affects ONLY Question Papers.
       Notes & Learning Resources are untouched.
    ===================================================== */

    const questionPaperBranches =
        document.querySelectorAll(
            ".resource-question-papers .question-branch"
        );


    questionPaperBranches.forEach(
        function (branch) {

            branch.addEventListener(
                "toggle",
                function () {

                    /* -------------------------------------
                       If branch is closed, do nothing
                    ------------------------------------- */

                    if (!this.open) {
                        return;
                    }


                    /* -------------------------------------
                       Close every other branch
                    ------------------------------------- */

                    questionPaperBranches.forEach(
                        function (otherBranch) {

                            if (
                                otherBranch !== branch &&
                                otherBranch.open
                            ) {

                                otherBranch.removeAttribute(
                                    "open"
                                );

                            }

                        }
                    );

                }
            );

        }
    );

});
