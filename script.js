/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICKING LINK
===================================================== */

const links = document.querySelectorAll(".nav-links a");


links.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


/* =====================================================
   SIMPLE SCROLL EFFECT
===================================================== */

window.addEventListener("scroll", function () {

    const header = document.querySelector(".header");

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 25px rgba(11,31,58,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});