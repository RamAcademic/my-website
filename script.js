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

        const dark = theme === "dark";

        html.classList.toggle("dark-mode", dark);
        body.classList.toggle("dark-mode", dark);

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-pressed",
                dark ? "true" : "false"
            );

            themeToggle.setAttribute(
                "aria-label",
                dark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                dark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );
        }

        localStorage.setItem("theme", theme);
    }


    const savedTheme =
        localStorage.getItem("theme");

    setTheme(
        savedTheme === "dark"
            ? "dark"
            : "light"
    );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const dark =
                    html.classList.contains(
                        "dark-mode"
                    );

                setTheme(
                    dark
                        ? "light"
                        : "dark"
                );

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


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    navLinks &&
                    navLinks.classList.contains(
                        "active"
                    )
                ) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }


    closeMobileMenu();


    if (navLinks) {

        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {
                        closeMobileMenu();
                    }
                );

            });

    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
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

        let current = "";

        sections.forEach(function (section) {

            const top =
                section.offsetTop - 180;

            const bottom =
                top + section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {

                current =
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

                if (
                    link.getAttribute("href") ===
                    "#" + current
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
       THEME SYNC BETWEEN TABS
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


    /* =====================================================
       NOTES & LEARNING RESOURCES
       
       ONLY ONE BRANCH OPEN
       ONLY ONE SEMESTER OPEN
    ===================================================== */

    const notesBranches =
        document.querySelectorAll(
            ".notes-branches .notes-branch"
        );


    /* -----------------------------------------------------
       CLOSE ALL NOTES BRANCHES AT START
    ----------------------------------------------------- */

    notesBranches.forEach(
        function (branch) {

            branch.open = false;

        }
    );


    /* -----------------------------------------------------
       NOTES BRANCH ACCORDION
    ----------------------------------------------------- */

    notesBranches.forEach(
        function (branch) {

            branch.addEventListener(
                "toggle",
                function () {

                    if (!branch.open) {
                        return;
                    }

                    notesBranches.forEach(
                        function (otherBranch) {

                            if (
                                otherBranch !== branch
                            ) {

                                otherBranch.open =
                                    false;

                            }

                        }
                    );

                }
            );

        }
    );


    /* -----------------------------------------------------
       NOTES SEMESTER ACCORDION
    ----------------------------------------------------- */

    notesBranches.forEach(
        function (branch) {

            const semesters =
                branch.querySelectorAll(
                    ".notes-semester"
                );


            semesters.forEach(
                function (semester) {

                    semester.open = false;

                }
            );


            semesters.forEach(
                function (semester) {

                    semester.addEventListener(
                        "toggle",
                        function () {

                            if (!semester.open) {
                                return;
                            }

                            semesters.forEach(
                                function (
                                    otherSemester
                                ) {

                                    if (
                                        otherSemester !==
                                        semester
                                    ) {

                                        otherSemester.open =
                                            false;

                                    }

                                }
                            );

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       MATHEMATICS QUESTION PAPERS
       
       ONLY ONE BRANCH OPEN
       ONLY ONE SEMESTER OPEN
    ===================================================== */

    const questionBranches =
        document.querySelectorAll(
            ".resource-question-papers .question-branch"
        );


    /* -----------------------------------------------------
       CLOSE ALL QUESTION PAPER BRANCHES
    ----------------------------------------------------- */

    questionBranches.forEach(
        function (branch) {

            branch.open = false;

        }
    );


    /* -----------------------------------------------------
       QUESTION PAPER BRANCH ACCORDION
    ----------------------------------------------------- */

    questionBranches.forEach(
        function (branch) {

            branch.addEventListener(
                "toggle",
                function () {

                    if (!branch.open) {
                        return;
                    }

                    questionBranches.forEach(
                        function (otherBranch) {

                            if (
                                otherBranch !== branch
                            ) {

                                otherBranch.open =
                                    false;

                            }

                        }
                    );

                }
            );

        }
    );


    /* -----------------------------------------------------
       QUESTION PAPER SEMESTER ACCORDION
    ----------------------------------------------------- */

    questionBranches.forEach(
        function (branch) {

            const semesters =
                branch.querySelectorAll(
                    ".question-semester"
                );


            semesters.forEach(
                function (semester) {

                    semester.open = false;

                }
            );


            semesters.forEach(
                function (semester) {

                    semester.addEventListener(
                        "toggle",
                        function () {

                            if (!semester.open) {
                                return;
                            }

                            semesters.forEach(
                                function (
                                    otherSemester
                                ) {

                                    if (
                                        otherSemester !==
                                        semester
                                    ) {

                                        otherSemester.open =
                                            false;

                                    }

                                }
                            );

                        }
                    );

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

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );

});
