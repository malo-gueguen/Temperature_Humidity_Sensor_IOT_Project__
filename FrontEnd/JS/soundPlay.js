document.addEventListener("click", () => {
    let randClicky = Math.random() * 2
    let sound = NaN
    if (randClicky <= 1) {
        let randIntern = Math.random() * 4
        if (randIntern < 1) {
            sound = new Audio("../Audio/audioLck1.m4a");
        } else if (randIntern < 2) {
            sound = new Audio("../Audio/audioLck2.m4a");
        } else if (randIntern < 3) {
            sound = new Audio("../Audio/audioLck3.m4a");
        } else {
            sound = new Audio("../Audio/audioLck4.m4a");
        }
    } else {
        sound = new Audio("../Audio/audioDefault.m4a");
    }
    sound.play();
});