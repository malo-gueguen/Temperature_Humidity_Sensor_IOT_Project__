document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    container.style.position = "fixed";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.pointerEvents = "none";
    container.style.fontFamily = "Arial, sans-serif";
    container.style.fontWeight = "bold";
    container.style.textAlign = "center";
    container.style.zIndex = "9999";

    document.addEventListener("keydown", (event) => {
        createPopup(event.key);
    });

    function createPopup(text) {
        const popup = document.createElement("div");
        popup.textContent = text;
        popup.style.position = "absolute";
        popup.style.fontSize = "10rem";
        popup.style.color = "hsl(" + Math.random() * 360 + ", 100%, 60%)";
        popup.style.opacity = "1";
        
        const offsetX = (Math.random() - 0.5) * 1000;
        const offsetY = (Math.random() - 0.5) * 500;
        popup.style.left = `calc(50% + ${offsetX}px)`;
        popup.style.top = `calc(50% + ${offsetY}px)`;
        popup.style.transform = "translate(-50%, -50%)";
        
        container.appendChild(popup);

        const moveX = (Math.random() - 0.5) * 800;
        const moveY = -50 - (Math.random() - 0.5) * 600;
        const duration = 400 + Math.random() * 300;
        
        popup.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
        
        setTimeout(() => {
            popup.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
            popup.style.opacity = "0";
        }, 50);

        setTimeout(() => {
            popup.remove();
        }, duration + 50);
    }
});
