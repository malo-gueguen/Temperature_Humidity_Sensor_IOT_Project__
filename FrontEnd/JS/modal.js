let btnConnexion = document.getElementById("btn_conn");
let btnSubscription = document.querySelector(".subscriptionButton");
let containerStation = document.getElementById("containerStation");
let containerModal = document.getElementById("containerModal");

let inputUser = document.getElementById("inputUser").value;
let inputPassword = document.getElementById("inputPassword").value;
let placeholderUser = document.getElementById("inputUser").placeholder;
let placeholderPassword = document.getElementById("inputPassword").placeholder;

let sendButton = document.getElementById("loginButton");
let inscription = document.getElementById("inscription");

let statemodal = 0;
let openTime = new Date().valueOf();

ConnexionUser = false;

let SeConnecterh1 = document.getElementById("SeConnecterh1");
let connexion = document.querySelector(".connexionButton");
let connexionState = 0;

//Vérification du compte existant lors de la connexion
// btnConnexion.addEventListener("click", async function fetchConnexion() {
//   if (btnConnexion.classList.contains("connexionButton")) {

//   }
// });

// ouvrir et fermer le modal
sendButton.addEventListener("click", () => {
  if (statemodal === 0 && ConnexionUser === false) {
    openTime = new Date().valueOf();
    openModal();
  }
  if (ConnexionUser === true) {
    document.getElementById("nbDataSelector").classList.add("hidden");
    sendButton.textContent = "Se connecter";
    location.reload();
  }
});

document.addEventListener("click", (evt) => {
  if (openTime > new Date().valueOf() - 100) {
    return;
  }
  let modal = document.getElementById("modal");
  if (!modal.contains(evt.target) && statemodal === 1) {
    closeModal();
  }
});

function openModal() {
  statemodal = 1;
  containerModal.style.display = "flex";
  containerStation.style.filter = "blur(0.6rem)";
}

function closeModal() {
  statemodal = 0;
  containerModal.style.display = "none";
  containerStation.style.filter = "none";
}

// switch se connecter / s'inscrire
inscription.addEventListener("click", function (e) {
  if (connexionState == 0) {
    console.log("inscription");
    console.log(connexionState);
    SeConnecterh1.innerHTML = "S'inscrire";
    connexion.innerHTML = "S'inscrire";
    connexion.classList.remove("connexionButton");
    connexion.classList.add("subscriptionButton");
    inscription.innerHTML = "Se connecter";
    connexionState = 1;
  } else if (connexionState == 1) {
    console.log("connexion");
    console.log(connexionState);
    SeConnecterh1.innerHTML = "Se connecter";
    connexion.innerHTML = "Se connecter";
    connexion.classList.add("connexionButton");
    connexion.classList.remove("subscriptionButton");
    inscription.innerHTML = "Pas de compte ? Inscrivez-vous ?";
    connexionState = 0;
  }
});

//Inscription et connection

btnConnexion.addEventListener("click", async (event) => {
  event.preventDefault();
  //   console.log("testclicksubscription")

  if (btnConnexion.classList.contains("subscriptionButton")) {
    //INSCRIPTION

    console.log("inscription en cours");

    inputPassword = document.getElementById("inputPassword").value;
    inputUser = document.getElementById("inputUser").value;
    // console.log("password =");
    // console.log(inputPassword);
    // console.log("user =");
    // console.log(inputUser);
    let dataUser = {
      user: inputUser,
      password: inputPassword,
    };

    console.log("json encodé = ", JSON.stringify(dataUser));

    fetch("https://iotcesi.alwaysdata.net/BackEnd/PHP/AddUser.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur :", data);

        if (data.status === "duplicate") {
          let inputUserDoublon = document.getElementById("inputUser");
          let inputPasswordDoublon = document.getElementById("inputPassword");
          inputUserDoublon.style.backgroundColor = "red";
          inputPasswordDoublon.style.backgroundColor = "red";
        } else if (data.status === "success") {
          console.log("modal closed, inscription validée bb");
          closeModal();
        }
      })
      .catch((error) => console.error("Erreur dans fetch :", error));
  } else {
<<<<<<< HEAD
    //CONNEXION

=======
    console.log("connect in progress")
>>>>>>> 78ffdcdce36e1b311c314fd6d31254d0096e3909
    try {
      console.log("in try...")
      inputUser = document.getElementById("inputUser").value;
      inputPassword = document.getElementById("inputPassword").value;
      const response = await fetch(
        "https://iotcesi.alwaysdata.net/BackEnd/PHP/user_conn.php",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      console.log("data recieved: ", data)

      data.forEach((item) => {
        if (inputUser == item.user && inputPassword == item.password) {
          document.getElementById("inputUser").value = "";
          document.getElementById("inputPassword").value = "";
          document.getElementById("nbDataSelector").classList.remove("hidden");
          console.log("connected");
          sendButton.textContent = "Se déconnecter";
          ConnexionUser = true;
          closeModal();
        } else {
          console.log("connexion abandonnée");

          console.log("no match")

          document.getElementById("inputUser").value = "";
          document.getElementById("inputPassword").value = "";
        }
        console.log("connect complete")
      });
    } catch (error) {
      console.error("Error in fetchConnexion: ", error);
    }
  }
});
