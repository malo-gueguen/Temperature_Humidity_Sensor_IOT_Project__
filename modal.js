
let btnConnexion = document.getElementById("btn_conn")
let btnSubscription = document.querySelector(".subscriptionButton")
let containerStation = document.getElementById("containerStation")
let containerModal = document.getElementById("containerModal")


let sendButton = document.getElementById("loginButton")
let inscription = document.getElementById("inscription")

let statemodal = 0;
let openTime = new Date().valueOf()

let SeConnecterh1 = document.getElementById("SeConnecterh1");
let connexion = document.querySelector(".connexionButton");
let connexionState = 0;


//Vérification du compte existant lors de la connexion
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
            closeModal()

        }else{
            document.getElementById("inputUser").value = ""
            document.getElementById("inputPassword").value = ""
        }
        });
    } catch (error) {
        console.error("Error in fetchConnexion: ", error);
    }
});




// ouvrir et fermer le modal
sendButton.addEventListener("click", () =>{
    if(statemodal === 0){
        openTime = new Date().valueOf()
        openModal()
    }
});

document.addEventListener("click", (evt)=>{
    if (openTime > new Date().valueOf() - 100) {
        return;
    }
    let modal = document.getElementById("modal")
    if(!(modal.contains(evt.target)) && statemodal === 1){ 
        closeModal()
    }
})


function openModal(){
        statemodal = 1
        containerModal.style.display = "flex"
        containerStation.style.filter = "blur(0.6rem)"
        
}

function closeModal(){
        statemodal = 0
        containerModal.style.display = "none"
        containerStation.style.filter = "none"        
}



// switch se connecter / s'inscrire
inscription.addEventListener("click", function(e){
    if(connexionState == 0){
        SeConnecterh1.innerHTML = "S'inscrire";
        connexion.innerHTML = "S'inscrire";
        connexion.classList.remove('connexionButton');
        connexion.classList.add("subscriptionButton");
        inscription.innerHTML = "Se connecter";
        connexionState = 1;
    } else if(connexionState == 1) {
        SeConnecterh1.innerHTML = "Se connecter";
        connexion.innerHTML = "Se connecter";
        connexion.classList.add('connexionButton');
        connexion.classList.remove("subscriptionButton");
        inscription.innerHTML = "Pas de compte ? Inscrivez-vous ?";
        connexionState = 0;
    }
});

//Inscription method POST


    let subscriptionButton = document.getElementById("btn_conn");

    subscriptionButton.addEventListener("click", (event) => {
          event.preventDefault();
      
        if(subscriptionButton.classList.contains("connexionButton")){
            console.log("inscription returned")
            return
        }
        console.log("inscription en cours")
        
        let inputPassword = document.getElementById("inputPassword").value;
        let inputUser = document.getElementById("inputUser").value;
        let data = {
            user: inputUser, 
            password: inputPassword
        };
        fetch("./AddUser.php",
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.text(); 
        })
        .then(data => console.log("Réponse du serveur :", data))
        .catch(error => console.error("Erreur dans fetch :", error));
    });






