document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("flower3d");

    if (!container) {
        console.error("3D flower container #flower3d was not found.");
        return;
    }

    if (typeof THREE === "undefined") {
        console.error(
            "Three.js was not loaded. Check the Three.js script."
        );
        return;
    }

    /* =========================================================
       SCENE
    ========================================================= */

    const scene = new THREE.Scene();


    /* =========================================================
       CAMERA
    ========================================================= */

    const camera = new THREE.PerspectiveCamera(
        32,
        1,
        0.1,
        100
    );

    camera.position.set(0, 0.8, 9.5);

    camera.lookAt(
        0,
        0.7,
        0
    );


    /* =========================================================
       RENDERER
    ========================================================= */

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";

    container.appendChild(
        renderer.domElement
    );


    /* =========================================================
       LIGHTING
    ========================================================= */

    const ambientLight =
        new THREE.AmbientLight(
            0xd8b4fe,
            1.8
        );

    scene.add(
        ambientLight
    );


    const mainLight =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    mainLight.position.set(
        -4,
        7,
        6
    );

    mainLight.castShadow = true;

    scene.add(
        mainLight
    );


    const purpleLight =
        new THREE.PointLight(
            0xa855f7,
            12,
            12
        );

    purpleLight.position.set(
        0,
        3,
        2
    );

    scene.add(
        purpleLight
    );


    const rimLight =
        new THREE.PointLight(
            0xd8b4fe,
            7,
            10
        );

    rimLight.position.set(
        -3,
        3,
        -3
    );

    scene.add(
        rimLight
    );


    /* =========================================================
       FLOWER GROUP
    ========================================================= */

    const flower =
        new THREE.Group();

    flower.position.set(
        0,
        -1.75,
        0
    );

    scene.add(
        flower
    );


    /* =========================================================
       MATERIALS
    ========================================================= */

    const petalMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x7b1fc9,

            emissive: 0x350052,

            emissiveIntensity: 0.55,

            roughness: 0.25,

            metalness: 0.03,

            clearcoat: 0.9,

            clearcoatRoughness: 0.15,

            side: THREE.DoubleSide
        });


    const petalHighlight =
        new THREE.MeshPhysicalMaterial({

            color: 0xb85cff,

            emissive: 0x5c0b91,

            emissiveIntensity: 0.65,

            roughness: 0.22,

            metalness: 0.02,

            clearcoat: 1,

            clearcoatRoughness: 0.1,

            side: THREE.DoubleSide
        });


    const stemMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x38104d,

            roughness: 0.45,

            metalness: 0.08
        });


    const leafMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x60168d,

            emissive: 0x180025,

            emissiveIntensity: 0.3,

            roughness: 0.38,

            clearcoat: 0.5,

            side: THREE.DoubleSide
        });


    const centerMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0xe0a3ff,

            emissive: 0x8b2bd6,

            emissiveIntensity: 1.6,

            roughness: 0.18,

            clearcoat: 1
        });


    /* =========================================================
       STEM
    ========================================================= */

    const stem =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.075,
                0.12,
                4.6,
                20
            ),

            stemMaterial
        );


    stem.position.y =
        0.25;


    stem.castShadow = true;

    stem.receiveShadow = true;


    flower.add(
        stem
    );


    /* =========================================================
       LEAVES
    ========================================================= */

    function createLeaf(
        side,
        y,
        rotationZ,
        scale = 1
    ) {

        const group =
            new THREE.Group();


        group.position.set(
            side * 0.08,
            y,
            0
        );


        group.rotation.z =
            rotationZ;


        const leaf =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.7,
                    28,
                    18
                ),

                leafMaterial
            );


        leaf.scale.set(
            1.3 * scale,
            0.38 * scale,
            0.14 * scale
        );


        leaf.position.x =
            side * 0.55;


        leaf.rotation.z =
            side > 0
                ? -0.25
                : 0.25;


        leaf.castShadow = true;

        leaf.receiveShadow = true;


        group.add(
            leaf
        );


        flower.add(
            group
        );


        return group;
    }


    createLeaf(
        -1,
        -0.25,
        -0.18,
        1
    );


    createLeaf(
        1,
        0.75,
        0.18,
        1
    );


    createLeaf(
        -1,
        1.15,
        -0.1,
        0.72
    );


    /* =========================================================
       PETALS
    ========================================================= */

    const petalGroups = [];


    function createPetal(
        angle,
        index
    ) {

        const group =
            new THREE.Group();


        group.rotation.z =
            angle;


        group.position.y =
            2.38;


        const petal =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.74,
                    32,
                    24
                ),

                index % 2 === 0
                    ? petalMaterial
                    : petalHighlight
            );


        petal.scale.set(
            0.72,
            1.5,
            0.25
        );


        petal.position.y =
            0.62;


        petal.rotation.x =
            THREE.MathUtils.degToRad(-7);


        petal.castShadow = true;

        petal.receiveShadow = true;


        group.add(
            petal
        );


        flower.add(
            group
        );


        petalGroups.push(
            group
        );
    }


    const petalCount = 8;


    for (
        let i = 0;
        i < petalCount;
        i++
    ) {

        createPetal(

            (Math.PI * 2 / petalCount) * i,

            i
        );
    }


    /* =========================================================
       INNER PETALS
    ========================================================= */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const angle =
            (Math.PI * 2 / 8) * i +
            Math.PI / 8;


        const group =
            new THREE.Group();


        group.rotation.z =
            angle;


        group.position.y =
            2.38;


        const petal =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.57,
                    28,
                    20
                ),

                petalHighlight
            );


        petal.scale.set(
            0.63,
            1.08,
            0.2
        );


        petal.position.y =
            0.43;


        petal.castShadow = true;

        petal.receiveShadow = true;


        group.add(
            petal
        );


        flower.add(
            group
        );


        petalGroups.push(
            group
        );
    }


    /* =========================================================
       FLOWER CENTER
    ========================================================= */

    const center =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.48,
                36,
                28
            ),

            centerMaterial
        );


    center.position.y =
        2.38;


    center.scale.set(
        1,
        1,
        0.78
    );


    center.castShadow = true;


    flower.add(
        center
    );


    /* =========================================================
       CENTER GLOW
    ========================================================= */

    const glow =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.9,
                32,
                20
            ),

            new THREE.MeshBasicMaterial({

                color: 0xc084fc,

                transparent: true,

                opacity: 0.2,

                blending:
                    THREE.AdditiveBlending,

                depthWrite: false
            })
        );


    glow.position.y =
        2.38;


    flower.add(
        glow
    );


    /* =========================================================
       GROUND GLOW
    ========================================================= */

    const groundGlow =
        new THREE.Mesh(

            new THREE.CircleGeometry(
                2,
                64
            ),

            new THREE.MeshBasicMaterial({

                color: 0x8b2bd6,

                transparent: true,

                opacity: 0.14,

                blending:
                    THREE.AdditiveBlending,

                depthWrite: false
            })
        );


    groundGlow.rotation.x =
        -Math.PI / 2;


    groundGlow.position.set(
        0,
        -2,
        -0.15
    );


    scene.add(
        groundGlow
    );


    /* =========================================================
       WIND VARIABLES
    ========================================================= */

    let wind =
        0;

    let windVelocity =
        0;


    /* =========================================================
       WIND PARTICLES
    ========================================================= */

    function createWindParticles() {

        const group =
            new THREE.Group();


        scene.add(
            group
        );


        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const material =
                new THREE.MeshBasicMaterial({

                    color: 0xd8b4fe,

                    transparent: true,

                    opacity: 0.8,

                    blending:
                        THREE.AdditiveBlending
                });


            const particle =
                new THREE.Mesh(

                    new THREE.SphereGeometry(
                        0.025 +
                        Math.random() * 0.035,

                        8,
                        8
                    ),

                    material
                );


            particle.position.set(

                -0.3 +
                Math.random() * 0.8,

                -0.1 +
                Math.random() * 3.5,

                Math.random() * 0.8
            );


            particle.userData.speed =
                1.5 +
                Math.random() * 2.2;


            group.add(
                particle
            );
        }


        const start =
            performance.now();


        function animateParticles(now) {

            const elapsed =
                (now - start) / 1000;


            group.children.forEach(
                particle => {

                    particle.position.x +=
                        particle.userData.speed *
                        0.025;


                    particle.position.y +=
                        Math.sin(
                            elapsed * 5 +
                            particle.position.x
                        ) * 0.009;


                    particle.material.opacity =
                        Math.max(
                            0,
                            0.85 -
                            elapsed * 0.65
                        );
                }
            );


            if (
                elapsed < 1.5
            ) {

                requestAnimationFrame(
                    animateParticles
                );

            } else {

                scene.remove(
                    group
                );

                group.traverse(
                    object => {

                        if (
                            object.material
                        ) {
                            object.material.dispose();
                        }

                        if (
                            object.geometry
                        ) {
                            object.geometry.dispose();
                        }

                    }
                );
            }
        }


        requestAnimationFrame(
            animateParticles
        );
    }


    /* =========================================================
       BLOW FLOWER
    ========================================================= */

    function blowFlower() {

        /*
         * Add wind force.
         */
        windVelocity +=
            0.16;


        /*
         * Create glowing wind particles.
         */
        createWindParticles();


        /*
         * Change the hint temporarily.
         */
        const hint =
            document.querySelector(
                ".tap-hint"
            );


        if (hint) {

            hint.innerHTML =
                "✦ The wind is blowing... ✦";


            clearTimeout(
                hint._timer
            );


            hint._timer =
                setTimeout(
                    () => {

                        hint.innerHTML =
                            "<span>✦</span> Tap the flower <span>✦</span>";

                    },
                    1400
                );
        }
    }


    /* =========================================================
       TAP / CLICK
    ========================================================= */

    renderer.domElement.addEventListener(
        "pointerdown",

        event => {

            event.preventDefault();

            blowFlower();

        },

        {
            passive: false
        }
    );


    /* =========================================================
       MOUSE / TOUCH PARALLAX
    ========================================================= */

    let targetX =
        0;

    let targetY =
        0;


    renderer.domElement.addEventListener(
        "pointermove",

        event => {

            const rect =
                renderer.domElement
                    .getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                Math.max(
                    rect.width,
                    1
                );


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                Math.max(
                    rect.height,
                    1
                );


            targetX =
                (x - 0.5) *
                0.22;


            targetY =
                (y - 0.5) *
                0.15;

        }
    );


    renderer.domElement.addEventListener(
        "pointerleave",

        () => {

            targetX = 0;

            targetY = 0;

        }
    );


    /* =========================================================
       RESPONSIVE
    ========================================================= */

    function resize() {

        const width =
            Math.max(
                container.clientWidth,
                1
            );


        const height =
            Math.max(
                container.clientHeight,
                1
            );


        camera.aspect =
            width / height;


        camera.updateProjectionMatrix();


        /*
         * Portrait phone:
         * move camera farther away.
         */
        if (
            width < 600 &&
            height > width
        ) {

            camera.position.z =
                10.8;


            flower.scale.setScalar(
                0.98
            );

        }


        /*
         * Tablet / small screen.
         */
        else if (
            width < 900
        ) {

            camera.position.z =
                10;


            flower.scale.setScalar(
                1.02
            );

        }


        /*
         * Desktop.
         */
        else {

            camera.position.z =
                9.2;


            flower.scale.setScalar(
                1.08
            );
        }


        camera.lookAt(
            0,
            0.55,
            0
        );


        renderer.setSize(
            width,
            height,
            false
        );


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                2
            )
        );
    }


    window.addEventListener(
        "resize",
        resize
    );


    window.addEventListener(
        "orientationchange",

        () => {

            setTimeout(
                resize,
                150
            );

        }
    );


    resize();


    /* =========================================================
       ANIMATION
    ========================================================= */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();


        /*
         * Very small natural breathing.
         */
        const idle =
            Math.sin(
                elapsed * 1.2
            ) * 0.012;


        /*
         * Wind physics.
         */
        wind +=
            windVelocity;


        windVelocity *=
            0.88;


        if (
            Math.abs(
                windVelocity
            ) < 0.0005
        ) {

            windVelocity =
                0;
        }


        wind *=
            0.88;


        /*
         * Wind bending.
         */
        const windBend =
            wind +
            Math.sin(
                elapsed * 9
            ) *
            Math.abs(
                wind
            ) *
            0.35;


        flower.rotation.z =
            windBend;


        /*
         * 3D parallax.
         */
        flower.rotation.y +=
            (
                targetX * 0.5 -
                flower.rotation.y
            ) *
            0.035;


        flower.rotation.x +=
            (
                -targetY * 0.35 -
                flower.rotation.x
            ) *
            0.035;


        /*
         * Keep flower in position.
         */
        flower.position.y =
            -1.75 +
            idle;


        /*
         * Tiny petal movement.
         */
        petalGroups.forEach(
            (group, index) => {

                group.rotation.x =
                    Math.sin(
                        elapsed * 0.8 +
                        index
                    ) *
                    0.006;
            }
        );


        /*
         * Glowing center.
         */
        const pulse =
            1 +
            Math.sin(
                elapsed * 2.2
            ) *
            0.07;


        glow.scale.setScalar(
            pulse
        );


        /*
         * Ground glow.
         */
        const groundPulse =
            1 +
            Math.sin(
                elapsed
            ) *
            0.05;


        groundGlow.scale.set(
            groundPulse,
            groundPulse,
            1
        );


        renderer.render(
            scene,
            camera
        );
    }


    animate();


    console.log(
        "3D Purple Flower loaded successfully."
    );

});
