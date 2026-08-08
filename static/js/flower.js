document.addEventListener("DOMContentLoaded", () => {

    const flower = document.getElementById("flower");

    if (!flower) {
        console.error("Flower not found.");
        return;
    }

    let windTimeout = null;

    function createWindParticles() {

        const garden = document.querySelector(".garden");

        if (!garden) return;

        for (let i = 0; i < 12; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "wind-particle";

            particle.style.left =
                (40 + Math.random() * 30) + "%";

            particle.style.top =
                (25 + Math.random() * 40) + "%";

            garden.appendChild(
                particle
            );

            const distance =
                80 + Math.random() * 140;

            const height =
                -40 + Math.random() * 80;

            particle.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translate(0, 0) scale(.3)"
                    },

                    {
                        opacity: 1,
                        transform:
                            `translate(
                                ${distance * .45}px,
                                ${height * .4}px
                            ) scale(1)`
                    },

                    {
                        opacity: 0,
                        transform:
                            `translate(
                                ${distance}px,
                                ${height}px
                            ) scale(0)`
                    }
                ],
                {
                    duration:
                        900 +
                        Math.random() * 500,

                    easing:
                        "cubic-bezier(.15,.75,.25,1)",

                    fill: "forwards"
                }
            );

            setTimeout(() => {
                particle.remove();
            }, 1600);
        }
    }


    function blowFlower() {

        /* Restart the wind animation */

        flower.classList.remove(
            "wind"
        );

        void flower.offsetWidth;

        flower.classList.add(
            "wind"
        );

        createWindParticles();

        clearTimeout(
            windTimeout
        );

        windTimeout =
            setTimeout(() => {

                flower.classList.remove(
                    "wind"
                );

            }, 1800);
    }


    /* =====================================================
       TAP / CLICK
    ===================================================== */

    flower.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            blowFlower();

        }
    );


    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    flower.setAttribute(
        "role",
        "button"
    );

    flower.setAttribute(
        "tabindex",
        "0"
    );


    flower.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                blowFlower();
            }
        }
    );


    console.log(
        "2D purple flower loaded."
    );

});
