
async function fetchConnexion() {
    try {
        const response = await fetch("https://iotcesi.alwaysdata.net/user_conn.php", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
        inputUser = document.getElementById("inputUser").value;
        inputPassword = document.getElementById("inputPassword").value;
    
        data.forEach((item) => {
    
        console.log(item.user)
        console.log(item.password)
        console.log(inputUser)
        console.log(inputPassword)
        if( inputUser == item.user && inputPassword == item.password) {
            console.log("done")
            
        }
        });
    } catch (error) {
        console.error("Error in fetchConnexion: ", error);
    }
}

