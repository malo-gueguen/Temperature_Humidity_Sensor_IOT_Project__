document.addEventListener("DOMContentLoaded", () => {
    let active = true

    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];

    document.addEventListener("click", (event) => {
        createExplosion(event.clientX, event.clientY);
    });

    function createExplosion(x, y) {
        for (let i = 0; i < 30; i++) {
            particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                alpha: 1,
                size: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 60%)`
            });
        }
    }

    function updateParticles() {
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02;
            if (p.alpha <= 0) particles.splice(i, 1);
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    function animate() {
        if (active == true) {
            updateParticles();
            drawParticles();
        }
        requestAnimationFrame(animate);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    animate();
});
