const body = document.body;

function createCircle() {
    console.log("circle created")
    const circle = document.createElement("div");
    circle.classList.add("flash-circle");
    document.body.appendChild(circle);
    
    const x = Math.random() * (window.innerWidth - 50);
    const y = -100
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    
    circle.addEventListener("click", triggerFlashbang);
    
    setTimeout(() => {
        if (circle.parentElement) circle.remove();
    }, 5000);
}

function triggerFlashbang() {
    let flashbangSound = new Audio("../Audio/flashbang.mp3")
    flashbangSound.play()
    const flash = document.createElement("div");
    flash.classList.add("flashbang");
    document.body.appendChild(flash);
    
    const img = document.createElement("img");
    const nbImg = 5;
    let image = Math.floor(Math.random() * nbImg)
    img.src = "./fb_images/" + image + ".png";
    img.classList.add("flash-image");
    document.body.appendChild(img);
    
    setTimeout(() => {
        flash.remove();
        img.remove();
    }, 5000);
}

setInterval(createCircle, 7000);
