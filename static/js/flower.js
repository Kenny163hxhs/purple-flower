/* =========================================================
   PURPLE FLOWER - TAP TO BLOW IN THE WIND
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const flower = document.querySelector(".flower");
    const garden = document.querySelector(".garden");

    if (!flower || !garden) return;

    let windTimer = null;

    function createWindParticles() {

        for (let i = 0; i < 10; i++) {

            const particle = document.createElement("span");

            particle.className = "wind-particle";

            const startX = 45 + Math.random() * 35;
            const startY = 20 + Math.random() * 45;

            particle.style.left = `${startX}%`;
            particle.style.top = `${startY}%`;

            garden.appendChild(particle);

            const distance = 100 + Math.random() * 120;
            const height = -30 - Math.random() * 80;

            particle.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translate3d(0, 0, 0) scale(.4)"
                    },

                    {
                        opacity: 1,
                        transform:
                            `translate3d(${distance * .45}px, ${height * .4}px, 0) scale(1)`
                    },

                    {
                        opacity: 0,
                        transform:
                            `translate3d(${distance}px, ${height}px, 0) scale(0)`
                    }
                ],
                {
                    duration: 900 + Math.random() * 500,
                    delay: Math.random() * 150,
                    easing: "cubic-bezier(.15,.75,.25,1)",
                    fill: "forwards"
                }
            );

            setTimeout(() => {
                particle.remove();
            }, 1600);
        }
    }


    function blowFlower() {

        /* Restart the animation even when tapped repeatedly */
        flower.classList.remove("wind");

        void flower.offsetWidth;

        flower.classList.add("wind");

        createWindParticles();

        clearTimeout(windTimer);

        windTimer = setTimeout(() => {
            flower.classList.remove("wind");
        }, 1700);
    }


    /* =====================================================
       MOBILE + DESKTOP TAP / CLICK
    ===================================================== */

    flower.addEventListener("pointerdown", (event) => {

        event.preventDefault();

        blowFlower();

    });


    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    flower.setAttribute("role", "button");

    flower.setAttribute("tabindex", "0");

    flower.setAttribute(
        "aria-label",
        "Purple flower. Tap the flower to make it move with the wind."
    );


    /* Keyboard support */
    flower.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            blowFlower();

        }

    });

});