


let btnConnexion = document.querySelector(".connexionButton")
let btnSubscription = document.querySelector(".subscriptionButton")
let containerStation = document.getElementById("containerStation")
let containerModal = document.getElementById("containerModal")


let sendButton = document.getElementById("loginButton")
let inscription = document.getElementById("inscription")
let state = 0;


let SeConnecterh1 = document.getElementById("SeConnecterh1");
let connexion = document.querySelector(".connexionButton");
let connexionState = 0;


// btnSubscription.addEventListener("click", async function fetchConnexion (){
//     try {
//         const response = await fetch("https://iotcesi.alwaysdata.net/user_conn.php", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         });
    
//         const data = await response.json();
//         inputUser = document.getElementById("inputUser").value;
//         inputPassword = document.getElementById("inputPassword").value;
    
//         data.forEach((item) => {

//         if( inputUser == item.user && inputPassword == item.password) {            
            
//             document.getElementById("inputUser").style.backgroundColor = "bisque"
//             document.getElementById("inputPassword").style.backgroundColor = "bisque"
//             document.getElementById("inputUser").value = ""
//             document.getElementById("inputPassword").value = ""
//             document.getElementById("nbDataSelector").classList.remove("hidden")
//             closeModal(state, containerModal, containerStation)


//         }else{
//             console.log("test")
//             document.getElementById("inputUser").value = ""
//             document.getElementById("inputPassword").value = ""
//         }
//         });
//     } catch (error) {
//         console.error("Error in fetchConnexion: ", error);
//     }
// });

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
            
            document.getElementById("inputUser").style.backgroundColor = "bisque"
            document.getElementById("inputPassword").style.backgroundColor = "bisque"
            document.getElementById("inputUser").value = ""
            document.getElementById("inputPassword").value = ""
            document.getElementById("nbDataSelector").classList.remove("hidden")
            closeModal(state, containerModal, containerStation)
            


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





sendButton.addEventListener("click", () =>{
    console.log("modal")
    if(state == 0){
        openModal(state, containerModal, containerStation)
    }else if (state == 1){
        closeModal(state, containerModal, containerStation)
    }
});


function openModal(state, containerModal, containerStation){
        state = 1
        console.log("modal open")
        containerModal.style.display = "flex"
        containerStation.style.filter = "blur(0.6rem)"
        return state
}

function closeModal(state, containerModal, containerStation){
        state = 0
        console.log("modal close")
        containerModal.style.display = "none"
        containerStation.style.filter = "none" 
        return state
}


inscription.addEventListener("click", function(e){
    if(connexionState == 0){
        console.log("test")
        SeConnecterh1.innerHTML = "S'inscrire";
        connexion.innerHTML = "S'inscrire";
        connexion.classList.remove('connexionButton');
        connexion.classList.add("subscriptionButton");
        inscription.innerHTML = "Se connecter";
        connexionState =1;
    } else {
        SeConnecterh1.innerHTML = "Se connecter";
        connexion.innerHTML = "Se connecter";
        connexion.classList.add('connexionButton');
        connexion.classList.remove("subscriptionButton");
        inscription.innerHTML = "Pas de compte ? Inscrivez-vous ?";
        connexionState =0;
    }

});


// function changeForm(){
//     const loginForm = document.getElementById("loginForm");
//     let nbDataSelector = document.getElementById("nbDataSelector");
//     loginForm.style.display = "none";
//     logoutButton.style.display = "block";
//     nbDataSelector.classList.remove("hidden");
//   }


// document.addEventListener("click", (event) => {
//     console.log("test")
//     if (document.getElementById("containerModal").contains(event.target)){
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
//             containerStation.style.filter = "blur(0.6rem)"
//         }
//     }
// });



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

