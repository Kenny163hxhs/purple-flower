document.addEventListener("DOMContentLoaded", () => {

    const flower = document.querySelector(".flower");
    const garden = document.querySelector(".garden");

    if (!flower) {
        console.error("Flower element not found.");
        return;
    }

    let currentAnimation = null;

    function createWindParticles() {

        if (!garden) return;

        for (let i = 0; i < 12; i++) {

            const particle = document.createElement("span");

            particle.className = "wind-particle";

            particle.style.position = "absolute";
            particle.style.left = (45 + Math.random() * 30) + "%";
            particle.style.top = (20 + Math.random() * 45) + "%";

            particle.style.width = "4px";
            particle.style.height = "4px";

            particle.style.borderRadius = "50%";

            particle.style.background = "#d8b4fe";

            particle.style.boxShadow =
                "0 0 8px #d8b4fe, 0 0 18px #a855f7";

            particle.style.pointerEvents = "none";

            garden.appendChild(particle);

            const distance = 100 + Math.random() * 150;
            const height = -40 - Math.random() * 80;

            particle.animate(
                [
                    {
                        opacity: 0,
                        transform: "translate(0, 0) scale(0.4)"
                    },

                    {
                        opacity: 1,
                        transform:
                            `translate(${distance * 0.4}px, ${height * 0.3}px) scale(1)`
                    },

                    {
                        opacity: 0,
                        transform:
                            `translate(${distance}px, ${height}px) scale(0)`
                    }
                ],
                {
                    duration: 1000 + Math.random() * 500,
                    easing: "ease-out"
                }
            );

            setTimeout(() => {
                particle.remove();
            }, 1600);
        }
    }


    function blowFlower() {

        /* Cancel previous movement */
        if (currentAnimation) {
            currentAnimation.cancel();
        }

        /*
         * Directly animate the flower.
         * This does NOT depend on CSS .wind.
         */

        currentAnimation = flower.animate(
            [
                {
                    transform:
                        "rotate(0deg) rotateY(0deg) translateX(0)"
                },

                {
                    transform:
                        "rotate(-5deg) rotateY(-8deg) translateX(-5px)",
                    offset: 0.15
                },

                {
                    transform:
                        "rotate(8deg) rotateY(10deg) translateX(12px)",
                    offset: 0.32
                },

                {
                    transform:
                        "rotate(-10deg) rotateY(-13deg) translateX(-16px)",
                    offset: 0.50
                },

                {
                    transform:
                        "rotate(8deg) rotateY(10deg) translateX(12px)",
                    offset: 0.68
                },

                {
                    transform:
                        "rotate(-4deg) rotateY(-6deg) translateX(-6px)",
                    offset: 0.83
                },

                {
                    transform:
                        "rotate(0deg) rotateY(0deg) translateX(0)"
                }
            ],
            {
                duration: 1600,
                easing: "cubic-bezier(.15,.75,.25,1)",
                fill: "forwards"
            }
        );

        createWindParticles();
    }


    /*
     * MOBILE + DESKTOP
     *
     * pointerdown works with:
     * - touchscreen
     * - mouse
     * - stylus
     */

    flower.addEventListener("pointerdown", (event) => {

        event.preventDefault();

        blowFlower();

    });


    /*
     * Also support normal click.
     */

    flower.addEventListener("click", (event) => {

        /*
         * Prevent duplicate triggering on browsers
         * that fire both pointerdown and click.
         */

    });


    /*
     * Keyboard support
     */

    flower.setAttribute("role", "button");

    flower.setAttribute("tabindex", "0");

    flower.setAttribute(
        "aria-label",
        "Tap the flower to make it move in the wind"
    );


    flower.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            blowFlower();

        }

    });


    console.log("Purple flower wind effect loaded.");
});
