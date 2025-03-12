


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
            document.getElementById("inputUser").style.backgroundColor = "red"
            document.getElementById("inputPassword").style.backgroundColor = "red"
            document.getElementById("inputUser").value = ""
            document.getElementById("inputPassword").value = ""
        }
        });
    } catch (error) {
        console.error("Error in fetchConnexion: ", error);
    }
});



let sendButton = document.getElementById("sendButton")
let state = 0;
sendButton.addEventListener("click", function(){
    console.log("modal")
    let containerModal = document.getElementById("containerModal")
    if(state == 0){
        state = 1;
        console.log("modal open")
        containerModal.style.display = "flex"
    }else if (state == 1){
        state = 0;
        console.log("modal close")
        containerModal.style.display = "none"
    }
});



// function changeForm(){
//     const loginForm = document.getElementById("loginForm");
//     let nbDataSelector = document.getElementById("nbDataSelector");
//     loginForm.style.display = "none";
//     logoutButton.style.display = "block";
//     nbDataSelector.classList.remove("hidden");
//   }