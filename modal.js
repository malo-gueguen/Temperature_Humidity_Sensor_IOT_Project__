
let btnConnexion = document.getElementById("btn_conn")
let btnSubscription = document.querySelector(".subscriptionButton")
let containerStation = document.getElementById("containerStation")
let containerModal = document.getElementById("containerModal")


let sendButton = document.getElementById("loginButton")
let inscription = document.getElementById("inscription")

let statemodal = 0;
let openTime = new Date().valueOf()

console.log("initialisation de la valeur")
console.log(statemodal)


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




// ouvrir et fermer le modal
sendButton.addEventListener("click", () =>{
    console.log("modal")
    if(statemodal === 0){
        console.log("au moment du clic le state est à 0")
        openTime = new Date().valueOf()
        openModal()
    }
});

document.addEventListener("click", (evt)=>{
    if (openTime > new Date().valueOf() - 100) {
        return;
    }
    console.log(openTime)
    console.log("click")
    console.log("document.addeventlistener")
    console.log(statemodal)
    let modal = document.getElementById("modal")
    if(!(modal.contains(evt.target)) && statemodal === 1){
        console.log("!modal.contains(evt.target)")
        closeModal()
        console.log("modal fermé")
    }
    // if(containerStation.contains(evt.target)){
    //     console.log("containerStation.contains(evt.target)")
    // }
    // if(state === 1 && !modal.contains(evt.target)){
    //     closeModal(state, containerModal, containerStation)
    // }
})


function openModal(){
        console.log("start - openModal");
        statemodal = 1
        console.log("openModal - statemodal =")
        console.log(statemodal)
        containerModal.style.display = "flex"
        containerStation.style.filter = "blur(0.6rem)"
        console.log("End - openModal");
        
}

function closeModal(){
        console.log("start - closeModal");
        statemodal = 0
        console.log("closeModal - statemodal =")
        console.log(statemodal)
        containerModal.style.display = "none"
        containerStation.style.filter = "none"       
        console.log("End - closeModal");
        
}



// switch se connecter / s'inscrire
inscription.addEventListener("click", function(e){
    if(connexionState == 0){
        console.log(connexionState);
        SeConnecterh1.innerHTML = "S'inscrire";
        connexion.innerHTML = "S'inscrire";
        connexion.classList.remove('connexionButton');
        connexion.classList.add("subscriptionButton");
        inscription.innerHTML = "Se connecter";
        connexionState = 1;
    } else if(connexionState == 1) {
        console.log(connexionState);
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
          console.log("testclicksubscription")
      
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
        console.log(inputPassword)
        console.log(inputUser)
        console.log(JSON.stringify(data))

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






