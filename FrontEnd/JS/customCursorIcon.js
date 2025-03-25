document.addEventListener("DOMContentLoaded", function () {
    document.body.style.cursor = "none";
  
    const cursor = document.createElement("img");
    cursor.src = "../images/benjoukLeBeauCropResize.png";
    cursor.style.position = "absolute";
    cursor.style.width = "64px";
    cursor.style.height = "64px";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "4999";
  
    const cursorText = document.createElement("div");
    cursorText.innerText = "CHERCHE UN STAGE!";
    cursorText.style.position = "absolute";
    cursorText.style.fontSize = "14px";
    cursorText.style.fontWeight = "bold";
    cursorText.style.color = "white";
    cursorText.style.background = "rgba(0, 0, 0, 0.7)";
    cursorText.style.padding = "5px 8px";
    cursorText.style.borderRadius = "5px";
    cursorText.style.pointerEvents = "none";
    cursorText.style.whiteSpace = "nowrap";
    cursorText.style.transform = "translate(-30%, -50%)";
    cursorText.style.zIndex = "5000";
  
    document.body.appendChild(cursor);
    document.body.appendChild(cursorText);
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
  
      cursorText.style.left = `${e.pageX}px`;
      cursorText.style.top = `${e.pageY - 20}px`;
    });

    let texts = [
        "CHERCHE UN STAGE!",
        "EMBAUCHEZ-MOI!",
        "ALLO, C'EST POUR UN STAGE OU BIEN?",
        "ABONNEZ-VOUS A BENJ0UK SUR TWITCH",
        "JE VEUX UN STAGE WESH"
    ];
    let index = 1;
    setInterval(() => {
        cursorText.innerText = texts[index];
        index += 1;
        if (index >= texts.length) {
            index = 0;
        }
    }, 5000);


  });
  