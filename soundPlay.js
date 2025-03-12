document.addEventListener("click", () => {
    let randClicky = Math.random() * 50
    let sound = NaN
    if (randClicky <= 1) {
        sound = new Audio("OHYEAH.mp3");
    } else {
        sound = new Audio("MouseClickLoud.mp3");
    }
    sound.play();
});