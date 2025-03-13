


let btnConnexion = document.getElementById("connexion");
btnConnexion.addEventListener("click", async function fetchConnexion (){
    try {
        const response = await fetch("https://iotcesi.alwaysdata.net/user_conn.php", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
        inputUser = document.getElementById("inputUser").value;
        inputPassword = document.getElementById("inputPassword").value;
    
        data.forEach((item) => {

        if( inputUser == item.user && inputPassword == item.password) {
            console.log("done")
            
            document.getElementById("inputUser").style.backgroundColor = "bisque"
            document.getElementById("inputPassword").style.backgroundColor = "bisque"
            document.getElementById("inputUser").value = ""
            document.getElementById("inputPassword").value = ""

        }else{
            console.log("test")
            document.getElementById("inputUser").value = ""
            document.getElementById("inputPassword").value = ""
        }
        });
    } catch (error) {
        console.error("Error in fetchConnexion: ", error);
    }
});



let sendButton = document.getElementById("loginButton")
let inscription = document.getElementById("inscription")
let state = 0;

sendButton.addEventListener("click", function(){
    console.log("modal")
    let containerStation = document.getElementById("containerStation")
    let containerModal = document.getElementById("containerModal")
    if(state == 0){
        state = 1
        console.log("modal open")
        containerModal.style.display = "flex"
        containerStation.style.filter = "blur(0.6rem)"
    } else if (state == 1){
        state = 0
        console.log("modal close")
        containerModal.style.display = "none"
        containerStation.style.filter = "none"
    }
});


// document.addEventListener("click", function(e){
//     console.log("test")
//     if (document.getElementById(containerModal).contains(e.target)){
//         console.log("clic dans modal")
//     }else{
//         console.log("clic dehors modal")
//         if(state == 1){
//             state = 0
//             containerModal.style.display = "none"
//             containerStation.style.filter = "none"
//         }else if (state == 0){
//             state = 1
//             containerModal.style.display = "flex"
//             coinerStation.style.filter = "blur(0.6rem)"
//         }
//     }
// });

let SeConnecterh1 = document.getElementById("SeConnecterh1");
let connexion = document.getElementById("connexion");


inscription.addEventListener("click", function(e){
    console.log("test")
    SeConnecterh1.innerHTML = "S'inscrire";
    connexion.innerHTML = "S'inscrire";
    inscription.innerHTML = "Se connecter"
});


// function changeForm(){
//     const loginForm = document.getElementById("loginForm");
//     let nbDataSelector = document.getElementById("nbDataSelector");
//     loginForm.style.display = "none";
//     logoutButton.style.display = "block";
//     nbDataSelector.classList.remove("hidden");
//   }