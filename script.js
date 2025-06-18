document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const sun = document.querySelector(".sun");

    // --- ÓRBITAS CORREGIDAS ---
    // Se ha aumentado la distancia entre las órbitas para evitar colisiones iniciales.
    const celestialBodies = [
        {
            id: "mercury",
            el: document.getElementById("mercury"),
            orbitRadius: 90,
            speed: 0.008,
            angle: Math.random() * 360,
            size: 2,
        },
        {
            id: "venus",
            el: document.getElementById("venus"),
            orbitRadius: 140,
            speed: 0.006,
            angle: Math.random() * 360,
            size: 4,
        },
        {
            id: "earth",
            el: document.getElementById("earth"),
            orbitRadius: 200,
            speed: 0.004,
            angle: Math.random() * 360,
            size: 4.5,
        },
        {
            id: "mars",
            el: document.getElementById("mars"),
            orbitRadius: 260,
            speed: 0.003,
            angle: Math.random() * 360,
            size: 3,
        },
        // Espacio para el cinturón de asteroides (aprox. 300-340)
        {
            id: "jupiter",
            el: document.getElementById("jupiter"),
            orbitRadius: 380,
            speed: 0.0015,
            angle: Math.random() * 360,
            size: 8,
        },
        {
            id: "saturn",
            el: document.getElementById("saturn"),
            orbitRadius: 460,
            speed: 0.001,
            angle: Math.random() * 360,
            size: 7,
        },
        {
            id: "uranus",
            el: document.getElementById("uranus"),
            orbitRadius: 530,
            speed: 0.0008,
            angle: Math.random() * 360,
            size: 6,
        },
        {
            id: "neptune",
            el: document.getElementById("neptune"),
            orbitRadius: 590,
            speed: 0.0006,
            angle: Math.random() * 360,
            size: 6,
        },
        {
            id: "moon",
            el: document.getElementById("moon"),
            parent: "earth",
            orbitRadius: 40,
            speed: 0.05,
            angle: Math.random() * 360,
            size: 1.5,
        },
    ];

    // --- CREACIÓN DE ELEMENTOS DE FONDO ---
    function createStars() {
        const starsContainer = document.getElementById("stars-container");
        for (let i = 0; i < 300; i++) {
            const star = document.createElement("div");
            star.className = "star";
            const size = Math.random() * 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            // El parpadeo es más natural con duraciones y retrasos aleatorios
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }

    // Variabilidad en asteroides
    function createAsteroidBelt() {
        const belt = document.querySelector(".asteroid-belt");
        const beltCenter = belt.offsetWidth / 2;
        const beltInnerRadius = beltCenter * 0.85;
        const beltWidth = beltCenter * 0.15;
        for (let i = 0; i < 400; i++) {
            const asteroid = document.createElement("div");
            asteroid.className = "asteroid";
            const angle = Math.random() * 2 * Math.PI;
            const radius = beltInnerRadius + Math.random() * beltWidth;
            const x = beltCenter + radius * Math.cos(angle);
            const y = beltCenter + radius * Math.sin(angle);
            asteroid.style.top = `${y}px`;
            asteroid.style.left = `${x}px`;
            asteroid.style.width = `${1 + Math.random() * 3}px`;
            asteroid.style.height = `${1 + Math.random() * 4}px`;
            asteroid.style.opacity = 0.5 + Math.random() * 0.5;
            asteroid.style.background = `rgba(139,69,19,${
                0.5 + Math.random() * 0.5
            })`;
            belt.appendChild(asteroid);
        }
    }

    // --- DIBUJAR ÓRBITAS VISUALES ---
    function drawOrbits() {
        const svg = document.getElementById("orbits-svg");
        svg.innerHTML = "";
        const w = container.offsetWidth;
        const h = container.offsetHeight;
        const cx = w / 2;
        const cy = h / 2;
        // Solo planetas (no luna)
        celestialBodies.forEach((body) => {
            if (body.id === "moon") return;
            const r = body.orbitRadius;
            const circle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );
            circle.setAttribute("cx", cx);
            circle.setAttribute("cy", cy);
            circle.setAttribute("r", r);
            circle.setAttribute("class", "orbit-path");
            svg.appendChild(circle);
        });
    }

    // --- AJUSTAR SEPARACIÓN DE ÓRBITAS ---
    // Aumenta la separación entre planetas
    const base = 110;
    const step = 70;
    celestialBodies.forEach((body, i) => {
        if (body.id === "moon") return;
        body.orbitRadius = base + i * step;
    });
    // Luna
    const moon = celestialBodies.find((b) => b.id === "moon");
    if (moon) moon.orbitRadius = 50;

    // Redibujar órbitas al cambiar tamaño
    window.addEventListener("resize", drawOrbits);
    setTimeout(drawOrbits, 100); // Espera a que todo cargue

    // Inicializar todo
    createStars();
    createAsteroidBelt();

    // El resto del código de la simulación...
    celestialBodies.forEach((body) => {
        if (!body.el) return;
        body.active = true;
        body.isDragged = false;
        body.x = 0;
        body.y = 0;
        body.el.addEventListener("mousedown", (e) => onDragStart(e, body));
    });

    let draggedBody = null;

    function onDragStart(e, body) {
        e.preventDefault();
        draggedBody = body;
        body.isDragged = true;
        body.el.classList.add("dragging");
        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragEnd);
    }

    function onDragMove(e) {
        if (!draggedBody) return;
        const containerRect = container.getBoundingClientRect();
        let x = e.clientX - containerRect.left - draggedBody.el.offsetWidth / 2;
        let y = e.clientY - containerRect.top - draggedBody.el.offsetHeight / 2;
        draggedBody.el.style.left = `${x}px`;
        draggedBody.el.style.top = `${y}px`;
    }

    function onDragEnd() {
        if (!draggedBody) return;
        draggedBody.el.classList.remove("dragging");
        draggedBody.isDragged = false;
        const containerRect = container.getBoundingClientRect();
        const sunRect = sun.getBoundingClientRect();
        const sunCenterX =
            sunRect.left - containerRect.left + sun.offsetWidth / 2;
        const sunCenterY =
            sunRect.top - containerRect.top + sun.offsetHeight / 2;
        const sunRadius = sun.offsetWidth / 2;
        const planetRect = draggedBody.el.getBoundingClientRect();
        const planetCenterX =
            planetRect.left -
            containerRect.left +
            draggedBody.el.offsetWidth / 2;
        const planetCenterY =
            planetRect.top -
            containerRect.top +
            draggedBody.el.offsetHeight / 2;
        const dx = planetCenterX - sunCenterX;
        const dy = planetCenterY - sunCenterY;
        const distanceFromSun = Math.sqrt(dx * dx + dy * dy);

        if (distanceFromSun < sunRadius) {
            draggedBody.active = false;
            draggedBody.el.style.display = "none";
            createSunFlare(planetCenterX, planetCenterY);
        } else {
            draggedBody.orbitRadius = distanceFromSun;
            draggedBody.angle = Math.atan2(dy, dx);
        }

        draggedBody = null;
        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragEnd);
    }

    function createSunFlare(x, y) {
        const flare = document.createElement("div");
        flare.className = "sun-flare";
        flare.style.left = `${x - 30}px`;
        flare.style.top = `${y - 30}px`;
        container.appendChild(flare);
        flare.addEventListener("animationend", () => flare.remove());
    }

    function createExplosion(x, y) {
        const explosion = document.createElement("div");
        explosion.className = "explosion";
        explosion.style.left = `${x - 25}px`;
        explosion.style.top = `${y - 25}px`;
        container.appendChild(explosion);
        explosion.addEventListener("animationend", () => explosion.remove());
    }

    function checkCollisions() {
        const activeBodies = celestialBodies.filter((b) => b.active);
        for (let i = 0; i < activeBodies.length; i++) {
            for (let j = i + 1; j < activeBodies.length; j++) {
                const bodyA = activeBodies[i];
                const bodyB = activeBodies[j];
                const dx =
                    bodyA.x +
                    bodyA.el.offsetWidth / 2 -
                    (bodyB.x + bodyB.el.offsetWidth / 2);
                const dy =
                    bodyA.y +
                    bodyA.el.offsetHeight / 2 -
                    (bodyB.y + bodyB.el.offsetHeight / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const radiusA = bodyA.el.offsetWidth / 2;
                const radiusB = bodyB.el.offsetWidth / 2;

                if (distance < radiusA + radiusB) {
                    bodyA.active = false;
                    bodyB.active = false;
                    bodyA.el.style.display = "none";
                    bodyB.el.style.display = "none";
                    const explosionX =
                        (bodyA.x +
                            bodyA.el.offsetWidth / 2 +
                            bodyB.x +
                            bodyB.el.offsetWidth / 2) /
                        2;
                    const explosionY =
                        (bodyA.y +
                            bodyA.el.offsetHeight / 2 +
                            bodyB.y +
                            bodyB.el.offsetHeight / 2) /
                        2;
                    createExplosion(explosionX, explosionY);
                }
            }
        }
    }

    // Panel de información flotante
    const uiPanel = document.createElement("div");
    uiPanel.id = "ui-panel";
    uiPanel.style.position = "fixed";
    uiPanel.style.top = "20px";
    uiPanel.style.right = "20px";
    uiPanel.style.background = "rgba(0,0,0,0.8)";
    uiPanel.style.color = "#fff";
    uiPanel.style.padding = "16px 24px";
    uiPanel.style.borderRadius = "12px";
    uiPanel.style.boxShadow = "0 2px 16px #0008";
    uiPanel.style.display = "none";
    uiPanel.style.zIndex = 2000;
    document.body.appendChild(uiPanel);

    // Datos de planetas
    const planetData = {
        mercury: {
            name: "Mercurio",
            desc: "El planeta más cercano al Sol. Superficie rocosa y sin atmósfera significativa.",
            img: "./images/mercury.png",
        },
        venus: {
            name: "Venus",
            desc: "Segundo planeta. Atmósfera densa y efecto invernadero extremo.",
            img: "./images/venus.png",
        },
        earth: {
            name: "Tierra",
            desc: "Nuestro hogar. Único planeta conocido con vida.",
            img: "./images/earth.png",
        },
        mars: {
            name: "Marte",
            desc: "El planeta rojo. Posible destino para futuras misiones humanas.",
            img: "./images/mars.png",
        },
        jupiter: {
            name: "Júpiter",
            desc: "El gigante gaseoso más grande del sistema solar.",
            img: "./images/jupiter.png",
        },
        saturn: {
            name: "Saturno",
            desc: "Famoso por sus anillos espectaculares.",
            img: "./images/saturn.png",
        },
        uranus: {
            name: "Urano",
            desc: "Gigante helado con inclinación axial extrema.",
            img: "./images/uranus.png",
        },
        neptune: {
            name: "Neptuno",
            desc: "El planeta más lejano. Vientos supersónicos.",
            img: "./images/neptune.png",
        },
        moon: {
            name: "Luna",
            desc: "Satélite natural de la Tierra.",
            img: "./images/moon.png",
        },
    };

    // Mostrar información al hacer clic en un planeta
    Object.keys(planetData).forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("click", (e) => {
                e.stopPropagation();
                const data = planetData[id];
                uiPanel.innerHTML = `<h2 style='margin-top:0'>${data.name}</h2><img src='${data.img}' alt='${data.name}' style='width:60px;height:60px;display:block;margin:8px auto 12px;border-radius:50%;box-shadow:0 0 12px #fff8;'><p>${data.desc}</p><button id='close-ui-panel' style='margin-top:10px;padding:4px 12px;border:none;border-radius:6px;background:#444;color:#fff;cursor:pointer;'>Cerrar</button>`;
                uiPanel.style.display = "block";
                document.getElementById("close-ui-panel").onclick = () =>
                    (uiPanel.style.display = "none");
            });
        }
    });

    document.body.addEventListener("click", () => {
        uiPanel.style.display = "none";
    });

    // Pausar/reanudar animación
    let paused = false;
    window.addEventListener("keydown", (e) => {
        if (e.key === " ") {
            // barra espaciadora
            paused = !paused;
        }
        if (e.key === "r" || e.key === "R") {
            location.reload();
        }
    });

    function animate() {
        if (paused) {
            requestAnimationFrame(animate);
            return;
        }
        // Redibuja órbitas en cada frame para responsividad
        drawOrbits();

        const sunCenterX = container.offsetWidth / 2;
        const sunCenterY = container.offsetHeight / 2;

        celestialBodies.forEach((body) => {
            if (!body.active || body.isDragged) return;

            let orbitCenterX = sunCenterX;
            let orbitCenterY = sunCenterY;

            if (body.parent === "earth") {
                const earth = celestialBodies.find((p) => p.id === "earth");
                if (earth && earth.active) {
                    orbitCenterX = earth.x + earth.el.offsetWidth / 2;
                    orbitCenterY = earth.y + earth.el.offsetHeight / 2;
                }
            }

            body.angle += body.speed;
            const x =
                orbitCenterX +
                body.orbitRadius * Math.cos(body.angle) -
                body.el.offsetWidth / 2;
            const y =
                orbitCenterY +
                body.orbitRadius * Math.sin(body.angle) -
                body.el.offsetHeight / 2;
            body.x = x;
            body.y = y;
            body.el.style.left = `${x}px`;
            body.el.style.top = `${y}px`;
        });

        checkCollisions();
        requestAnimationFrame(animate);
    }

    animate();
});
