document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("flower3d");

    if (!container) {
        console.error("3D flower container not found.");
        return;
    }

    /* =====================================================
       SCENE
    ===================================================== */

    const scene = new THREE.Scene();


    /* =====================================================
       CAMERA
    ===================================================== */

    const camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.set(0, 1.25, 8.5);

    camera.lookAt(
        0,
        1.35,
        0
    );


    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    container.appendChild(
        renderer.domElement
    );


    /* =====================================================
       LIGHTING
    ===================================================== */

    const ambientLight =
        new THREE.AmbientLight(
            0xd8b4fe,
            1.4
        );

    scene.add(ambientLight);


    const moonLight =
        new THREE.DirectionalLight(
            0xffffff,
            2.2
        );

    moonLight.position.set(
        -3,
        6,
        5
    );

    moonLight.castShadow = true;

    scene.add(moonLight);


    const purpleLight =
        new THREE.PointLight(
            0xa855f7,
            8,
            9
        );

    purpleLight.position.set(
        0,
        2.8,
        1.5
    );

    scene.add(purpleLight);


    const rimLight =
        new THREE.PointLight(
            0xd8b4fe,
            5,
            7
        );

    rimLight.position.set(
        -3,
        3,
        -2
    );

    scene.add(rimLight);


    /* =====================================================
       FLOWER GROUP
    ===================================================== */

    const flower =
        new THREE.Group();

    flower.position.y = -1.7;

    flower.rotation.y = 0.05;

    scene.add(flower);


    /* =====================================================
       MATERIALS
    ===================================================== */

    const petalMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x8b2bd6,

            emissive: 0x3c0866,

            emissiveIntensity: 0.45,

            roughness: 0.28,

            metalness: 0.04,

            clearcoat: 0.7,

            clearcoatRoughness: 0.18,

            side: THREE.DoubleSide
        });


    const petalHighlight =
        new THREE.MeshPhysicalMaterial({

            color: 0xb45cff,

            emissive: 0x5e1499,

            emissiveIntensity: 0.55,

            roughness: 0.24,

            metalness: 0.03,

            clearcoat: 0.8,

            clearcoatRoughness: 0.12,

            side: THREE.DoubleSide
        });


    const stemMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x64139e,

            roughness: 0.5,

            metalness: 0.05
        });


    const leafMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x6d20a7,

            emissive: 0x21052f,

            emissiveIntensity: 0.25,

            roughness: 0.4,

            clearcoat: 0.35,

            side: THREE.DoubleSide
        });


    const centerMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0xc084fc,

            emissive: 0x7e22ce,

            emissiveIntensity: 1.2,

            roughness: 0.22,

            clearcoat: 1
        });


    /* =====================================================
       STEM
    ===================================================== */

    const stemGeometry =
        new THREE.CylinderGeometry(
            0.075,
            0.11,
            4.5,
            16
        );

    const stem =
        new THREE.Mesh(
            stemGeometry,
            stemMaterial
        );

    stem.position.y = 0.3;

    stem.castShadow = true;

    stem.receiveShadow = true;

    flower.add(stem);


    /* =====================================================
       LEAVES
    ===================================================== */

    function createLeaf(
        side,
        y,
        rotationZ
    ) {

        const leafGroup =
            new THREE.Group();

        leafGroup.position.set(
            side * 0.08,
            y,
            0
        );

        leafGroup.rotation.z =
            rotationZ;


        const geometry =
            new THREE.SphereGeometry(
                0.65,
                24,
                12
            );


        const leaf =
            new THREE.Mesh(
                geometry,
                leafMaterial
            );


        leaf.scale.set(
            1.25,
            0.35,
            0.12
        );


        leaf.rotation.z =
            side > 0
                ? -0.25
                : 0.25;


        leaf.position.x =
            side * 0.52;


        leaf.castShadow = true;


        leafGroup.add(leaf);

        flower.add(leafGroup);

        return leafGroup;
    }


    createLeaf(
        -1,
        -0.15,
        -0.12
    );


    createLeaf(
        1,
        0.75,
        0.12
    );


    /* =====================================================
       PETALS
    ===================================================== */

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


        const geometry =
            new THREE.SphereGeometry(
                0.72,
                32,
                20
            );


        const petal =
            new THREE.Mesh(
                geometry,

                index % 2 === 0
                    ? petalMaterial
                    : petalHighlight
            );


        /*
         * Stretch the sphere into
         * a rounded 3D petal.
         */

        petal.scale.set(
            0.72,
            1.45,
            0.22
        );


        petal.position.y =
            0.62;


        petal.rotation.x =
            THREE.MathUtils.degToRad(-5);


        petal.castShadow = true;

        petal.receiveShadow = true;


        group.add(petal);

        flower.add(group);

        petalGroups.push(group);

        return group;
    }


    const petalCount = 8;


    for (
        let i = 0;
        i < petalCount;
        i++
    ) {

        const angle =
            (Math.PI * 2 / petalCount) * i;


        createPetal(
            angle,
            i
        );
    }


    /* =====================================================
       INNER PETALS
    ===================================================== */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const angle =
            (Math.PI * 2 / 8) * i
            + Math.PI / 8;


        const group =
            new THREE.Group();


        group.rotation.z =
            angle;


        group.position.y =
            2.38;


        const geometry =
            new THREE.SphereGeometry(
                0.55,
                28,
                18
            );


        const petal =
            new THREE.Mesh(
                geometry,
                petalHighlight
            );


        petal.scale.set(
            0.62,
            1.05,
            0.18
        );


        petal.position.y =
            0.43;


        petal.castShadow = true;


        group.add(petal);

        flower.add(group);

        petalGroups.push(group);
    }


    /* =====================================================
       FLOWER CENTER
    ===================================================== */

    const centerGeometry =
        new THREE.SphereGeometry(
            0.47,
            32,
            24
        );


    const center =
        new THREE.Mesh(
            centerGeometry,
            centerMaterial
        );


    center.position.y =
        2.38;


    center.scale.set(
        1,
        1,
        0.75
    );


    center.castShadow = true;


    flower.add(center);


    /* =====================================================
       CENTER GLOW
    ===================================================== */

    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xc084fc,

            transparent: true,

            opacity: 0.18,

            blending:
                THREE.AdditiveBlending,

            side: THREE.DoubleSide
        });


    const glow =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.85,
                24,
                16
            ),

            glowMaterial
        );


    glow.position.y =
        2.38;


    flower.add(glow);


    /* =====================================================
       GROUND PURPLE GLOW
    ===================================================== */

    const groundGlow =
        new THREE.Mesh(

            new THREE.CircleGeometry(
                1.8,
                64
            ),

            new THREE.MeshBasicMaterial({

                color: 0x8b2bd6,

                transparent: true,

                opacity: 0.12,

                blending:
                    THREE.AdditiveBlending,

                depthWrite: false
            })
        );


    groundGlow.rotation.x =
        -Math.PI / 2;


    groundGlow.position.y =
        -2.0;


    groundGlow.position.z =
        -0.1;


    scene.add(
        groundGlow
    );


    /* =====================================================
       WIND
    ===================================================== */

    let windAnimation = null;


    function blowFlower() {

        if (windAnimation) {
            windAnimation.cancel();
        }


        /*
         * The entire 3D flower bends
         * as if wind is blowing it.
         */

        windAnimation =
            flower.animate(

                [
                    {
                        transform:
                            "translateY(-1.7px) rotateZ(0deg) rotateY(0deg)"
                    },

                    {
                        transform:
                            "translateY(-1.7px) rotateZ(-0.07rad) rotateY(-0.10rad)",

                        offset: 0.16
                    },

                    {
                        transform:
                            "translateY(-1.7px) rotateZ(0.11rad) rotateY(0.13rad)",

                        offset: 0.32
                    },

                    {
                        transform:
                            "translateY(-1.7px) rotateZ(-0.14rad) rotateY(-0.16rad)",

                        offset: 0.50
                    },

                    {
                        transform:
                            "translateY(-1.7px) rotateZ(0.10rad) rotateY(0.11rad)",

                        offset: 0.68
                    },

                    {
                        transform:
                            "translateY(-1.7px) rotateZ(-0.04rad) rotateY(-0.05rad)",

                        offset: 0.84
                    },

                    {
                        transform:
                            "translateY(-1.7px) rotateZ(0deg) rotateY(0deg)"
                    }
                ],

                {
                    duration: 1500,

                    easing:
                        "cubic-bezier(.15,.75,.25,1)",

                    fill: "forwards"
                }
            );


        createWindParticles();
    }


    /* =====================================================
       WIND PARTICLES
    ===================================================== */

    function createWindParticles() {

        const group =
            new THREE.Group();

        scene.add(group);


        for (
            let i = 0;
            i < 15;
            i++
        ) {

            const material =
                new THREE.MeshBasicMaterial({

                    color: 0xd8b4fe,

                    transparent: true,

                    opacity: 0.75,

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

                -0.1 +
                Math.random() * 0.6,

                1.0 +
                Math.random() * 2.2,

                Math.random() * 0.7
            );


            particle.userData.velocity =
                1.2 +
                Math.random() * 1.8;


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
                        particle.userData.velocity *
                        0.025;


                    particle.position.y +=
                        Math.sin(
                            elapsed * 5 +
                            particle.position.x
                        ) * 0.008;


                    particle.material.opacity =
                        Math.max(
                            0,
                            0.8 -
                            elapsed * 0.65
                        );
                }
            );


            if (elapsed < 1.5) {

                requestAnimationFrame(
                    animateParticles
                );

            } else {

                scene.remove(
                    group
                );
            }
        }


        requestAnimationFrame(
            animateParticles
        );
    }


    /* =====================================================
       TAP / CLICK
    ===================================================== */

    renderer.domElement.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            blowFlower();
        }
    );


    /* =====================================================
       MOUSE / TOUCH PARALLAX
    ===================================================== */

    let targetX = 0;
    let targetY = 0;


    renderer.domElement.addEventListener(
        "pointermove",
        event => {

            const rect =
                renderer.domElement.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width;


            const y =
                (event.clientY - rect.top) /
                rect.height;


            targetX =
                (x - 0.5) * 0.18;


            targetY =
                (y - 0.5) * 0.12;
        }
    );


    renderer.domElement.addEventListener(
        "pointerleave",
        () => {

            targetX = 0;

            targetY = 0;
        }
    );


    /* =====================================================
       RESPONSIVE
    ===================================================== */

    function resize() {

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;


        camera.aspect =
            width / height;


        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height
        );


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );


        if (
            width < 600 &&
            height > width
        ) {

            camera.position.z =
                9.2;

        } else {

            camera.position.z =
                8.5;
        }
    }


    window.addEventListener(
        "resize",
        resize
    );


    resize();


    /* =====================================================
       ANIMATION LOOP
    ===================================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();


        /*
         * Tiny breathing movement only.
         * The flower does NOT sway automatically.
         */

        const idle =
            Math.sin(
                elapsed * 1.2
            ) * 0.012;


        flower.position.y =
            -1.7 + idle;


        /*
         * Subtle petal depth movement.
         */

        petalGroups.forEach(
            (group, index) => {

                group.rotation.x =
                    Math.sin(
                        elapsed * 0.8 +
                        index
                    ) * 0.006;
            }
        );


        /*
         * Center glow pulse.
         */

        const pulse =
            1 +
            Math.sin(
                elapsed * 2.2
            ) * 0.06;


        glow.scale.set(
            pulse,
            pulse,
            pulse
        );


        /*
         * Mouse/touch 3D parallax.
         */

        flower.rotation.x +=
            (-targetY -
                flower.rotation.x) *
            0.035;


        flower.rotation.y +=
            (targetX -
                flower.rotation.y) *
            0.035;


        renderer.render(
            scene,
            camera
        );
    }


    animate();


    console.log(
        "3D purple flower loaded. Tap the flower to blow it in the wind."
    );

});
