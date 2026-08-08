document.addEventListener("DOMContentLoaded", () => {
  const flower = document.getElementById("flower");
  const garden = document.querySelector(".garden");
  const hint = document.querySelector(".tap-hint");
  const particles = document.getElementById("particles");

  if (!flower || !garden) {
    console.error("2D flower elements were not found.");
    return;
  }

  function createWindParticles() {
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("span");
      particle.className = "wind-particle";

      particle.style.left = `${42 + Math.random() * 28}%`;
      particle.style.top = `${20 + Math.random() * 45}%`;

      garden.appendChild(particle);

      const distance = 90 + Math.random() * 150;
      const height = -70 + Math.random() * 100;

      particle.animate(
        [
          {
            opacity: 0,
            transform: "translate3d(0,0,0) scale(.3)"
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
          duration: 900 + Math.random() * 600,
          easing: "cubic-bezier(.15,.75,.25,1)",
          fill: "forwards"
        }
      );

      setTimeout(() => particle.remove(), 1700);
    }
  }

  function blowFlower() {
    flower.classList.remove("wind");
    void flower.offsetWidth;
    flower.classList.add("wind");

    createWindParticles();

    if (hint) {
      hint.innerHTML = "<span>✦</span> The wind is blowing... <span>✦</span>";

      clearTimeout(hint._timer);

      hint._timer = setTimeout(() => {
        hint.innerHTML = "<span>✦</span> Tap the flower <span>✦</span>";
      }, 1500);
    }

    setTimeout(() => {
      flower.classList.remove("wind");
    }, 1750);
  }

  flower.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    blowFlower();
  }, { passive: false });

  flower.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      blowFlower();
    }
  });

  // Background particles
  if (particles) {
    for (let i = 0; i < 55; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${5 + Math.random() * 9}s`;
      p.style.animationDelay = `${Math.random() * 10}s`;

      const size = 1 + Math.random() * 3;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;

      particles.appendChild(p);
    }
  }

  console.log("Purple 2D flower loaded successfully.");
});
