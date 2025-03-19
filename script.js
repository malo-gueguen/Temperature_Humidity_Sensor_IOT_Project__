let valeurTemp;
let valeurHum;
let valeurTime;
let ctx = document.getElementById("myChart").getContext("2d");
let chart;
// let inputUser = document.getElementById("inputUser").textContent;
// let inputPassword = document.getElementById("inputPassword").textContent;
//let sendButton = document.getElementById("sendButton")
let notifPopUp = true;


let nbData;
let labelsGraph = [];
for (let i = 0; i < nbData; i++) {
  labelsGraph.push("-");
}


//    ______   _       _     
//   |  ____| | |     | |    
//   | |__ ___| |_ ___| |__  
//   |  __/ _ \ __/ __| '_ \ 
//   | | |  __/ || (__| | | |
//   |_|  \___|\__\___|_| |_|
//                           
//                           


async function fetchTemperature() {
  try {
    const response = await fetch("https://iotcesi.alwaysdata.net/getTemp.php", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    let htmlvar2 = "";
    valeurTemp = [];
    data.forEach((item) => {
      htmlvar2 += `${item.Temperature} °C `;
      if (valeurTemp.length < nbData) {
        valeurTemp.push(item.Temperature);
      }
    });
    console.log(`Température : ${valeurTemp}`);
    document.getElementById("temp").innerHTML = htmlvar2;
    updateTemperature();
  } catch (error) {
    console.error("Error in fetchTemperature: ", error);
  }
}

async function fetchTime() {
  try {
    const response = await fetch("https://iotcesi.alwaysdata.net/getTime.php", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    valeurTime = [];
    data.forEach((item) => {
      if (valeurTime.length < nbData) {
        valeurTime.push(item.Time);
      }
    });
  } catch (error) {
    console.error("Error in fetchTime: ", error);
  }
}

async function fetchHumidite() {
  try {
    const response = await fetch("https://iotcesi.alwaysdata.net/getHum.php", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    let htmlvar = "";
    valeurHum = [];
    data.forEach((item) => {
      htmlvar += `${item.Humidite}`;
      if (valeurHum.length < nbData) {
        valeurHum.push(item.Humidite);
      }
    });
    console.log(`Humidité : ${valeurHum}`);
    document.getElementById("hum").innerHTML = htmlvar;
    updateHumidty();

    // Mise à jour de l'heure
    mettreAJourHeure();
    setInterval(mettreAJourHeure, 1000);
  } catch (error) {
    console.error("Error in fetchHumidite: ", error);
  }
}

//    _    _           _       _       
//   | |  | |         | |     | |      
//   | |  | |_ __   __| | __ _| |_ ___ 
//   | |  | | '_ \ / _` |/ _` | __/ _ \
//   | |__| | |_) | (_| | (_| | ||  __/
//    \____/| .__/ \__,_|\__,_|\__\___|
//          | |                        
//          |_|                        

function updateTemperature() {
  let tempDiv = document.getElementById("temp");
  let message = document.getElementById("message");
  let tempString = tempDiv.textContent;
  let tempValue = parseInt(tempString, 10);

  if (tempValue >= 25) {
    tempDiv.innerHTML = tempValue + "°C";
    message.innerHTML = "☀️ Il fait beau !";
    if(notifPopUp == true){
      // notification();
      notifPopUp = false;
    }
  } else if (tempValue >= 10) {
    tempDiv.textContent = tempValue + "°C";
    message.innerHTML = "☁️ Il fait doux !";
  } else {
    tempDiv.textContent = tempValue + "°C";
    message.innerHTML = "❄️ Il fait froid !";
  }
}

function updateHumidty() {
  let humDiv = document.getElementById("hum");
  let message = document.getElementById("message2");
  let container = document.querySelector("#humContainer");
  let humString = humDiv.textContent;
  let humValue = parseInt(humString, 10);

  if (humValue >= 60) {
    humDiv.textContent = humValue + "%";
    message.innerHTML = "Humide 💧";
    container.classList.remove("hot");
  } else if (humValue >= 30 && humValue <= 60) {
    humDiv.textContent = humValue + "%";
    message.innerHTML = "Normal 🌤";
    container.classList.remove("hot");
  } else {
    humDiv.textContent = humValue + "%";
    container.classList.add("hot");
    message.innerHTML = "Sec 🌵";
  }
}


//    _    _                  
//   | |  | |                 
//   | |__| | ___  _   _ _ __ 
//   |  __  |/ _ \| | | | '__|
//   | |  | | (_) | |_| | |   
//   |_|  |_|\___/ \__,_|_|   
//                            
//                            

function mettreAJourHeure() {
  const maintenant = new Date();
  const optionsDate = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let dateFormatee = maintenant.toLocaleDateString("fr-FR", optionsDate);
  let morceaux = dateFormatee.split(" ");
  morceaux[0] = morceaux[0].charAt(0).toUpperCase() + morceaux[0].slice(1);
  dateFormatee = morceaux.join(" ");
  const heureFormatee = maintenant.toLocaleTimeString("fr-FR");
  document.getElementById("time").textContent =
    dateFormatee + " — " + heureFormatee;
}


//     _____                _                               _     
//    / ____|              | |                             | |    
//   | |     _ __ ___  __ _| |_ ___    __ _ _ __ __ _ _ __ | |__  
//   | |    | '__/ _ \/ _` | __/ _ \  / _` | '__/ _` | '_ \| '_ \ 
//   | |____| | |  __/ (_| | ||  __/ | (_| | | | (_| | |_) | | | |
//    \_____|_|  \___|\__,_|\__\___|  \__, |_|  \__,_| .__/|_| |_|
//                                     __/ |         | |          
//                                    |___/          |_|          


function createGraph() {
  console.log("Création du graphique");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: valeurTime,
      datasets: [
        {
          label: "Température",
          data: valeurTemp,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 3,
          fill: false,
        },
        {
          label: "Humidité",
          data: valeurHum,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderWidth: 3,
          fill: false,
        },
      ],
    },
    options: {
      hover: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 1,
          ticks: {
            stepSize: 5,
          },
        },
      },
    },
  });
  console.log("Graphique créé");
}

//    __  __       _       
//   |  \/  |     (_)      
//   | \  / | __ _ _ _ __  
//   | |\/| |/ _` | | '_ \ 
//   | |  | | (_| | | | | |
//   |_|  |_|\__,_|_|_| |_|
//                         
//                         

async function main() {
  await fetchTemperature();
  await fetchHumidite();
  await fetchTime();
  createGraph();
}

main();

// Mise à jour toutes les 10 secondes en s'assurant que les données sont chargées avant de recréer le graphique
setInterval(async () => {
  await fetchTemperature();
  await fetchHumidite();
  await fetchTime();

  if (chart) {
    chart.destroy();
  }
  createGraph();
}, 10000);


//    _   _       _   _  __ _           _   _             
//   | \ | |     | | (_)/ _(_)         | | (_)            
//   |  \| | ___ | |_ _| |_ _  ___ __ _| |_ _  ___  _ __  
//   | . ` |/ _ \| __| |  _| |/ __/ _` | __| |/ _ \| '_ \ 
//   | |\  | (_) | |_| | | | | (_| (_| | |_| | (_) | | | |
//   |_| \_|\___/ \__|_|_| |_|\___\__,_|\__|_|\___/|_| |_|
//                                                        
//                                                        

let permissionGranted = false;

function createNotification() {
  const text = "Il fait chaud";
  const notification = new Notification("Le temps est : ",{
    body: text,
    icon: img,
  });
}

function notification(){
  if (!permissionGranted) {
    console.log("Permission non accordée, demande en cours...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted" ) {  
        if(valeurTemp > 25 ){
          createNotification();
        } 
      } else {
        console.log("L'utilisateur a refusé ou ignoré la demande de notification.");
      }
    }); 
  } else {
    createNotification();
}
}

//    _                 _       
//   | |               (_)      
//   | |     ___   __ _ _ _ __  
//   | |    / _ \ / _` | | '_ \ 
//   | |___| (_) | (_| | | | | |
//   |______\___/ \__, |_|_| |_|
//                 __/ |        
//                |___/                                         

const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logoutButton");


logoutButton.addEventListener("click", async function() {
  logoutButton.style.display = "none";
  loginForm.style.display = "block";
  nbDataSelector.classList.add("hidden");
    nbData = 50;
    await fetchTime();
    if (chart) {
      chart.destroy();
    }
    createGraph();
});

//     _____ _                              _ _      _ _   _  __                                   _   
//    / ____| |                            ( | )    ( | ) (_)/ _|                                 | |  
//   | |    | |__   __ _ _ __   __ _  ___   V V__  __V V   _| |_    ___ ___  _ __  _ __   ___  ___| |_ 
//   | |    | '_ \ / _` | '_ \ / _` |/ _ \     \ \/ /     | |  _|  / __/ _ \| '_ \| '_ \ / _ \/ __| __|
//   | |____| | | | (_| | | | | (_| |  __/      >  <      | | |   | (_| (_) | | | | | | |  __/ (__| |_ 
//    \_____|_| |_|\__,_|_| |_|\__, |\___|     /_/\_\     |_|_|    \___\___/|_| |_|_| |_|\___|\___|\__|
//                              __/ |                                                                  
//     
//Permet de changer le nombre du x si on est connecté

let changeDataSelector = document.getElementById("changeDataSelector");

changeDataSelector.addEventListener("keypress", async function (e) {
  let value = changeDataSelector.value;
  if (e.key === "Enter") {
    nbData = value;
    await fetchTime();
    if (chart) {
      chart.destroy();
    }
    createGraph();
  }
});


//    _____           _                _                _    
//   |  __ \         (_)              | |              | |   
//   | |__) |___  ___ _ _______    ___| |__   __ _ _ __| |_  
//   |  _  // _ \/ __| |_  / _ \  / __| '_ \ / _` | '__| __| 
//   | | \ \  __/\__ \ |/ /  __/ | (__| | | | (_| | |  | |_  
//   |_|  \_\___||___/_/___\___|  \___|_| |_|\__,_|_|   \__| 
//                                                           
//                                                           
// Change la taille du graph en fonction de la taille de l'écran


let stateWindowSize = 0;
async function displayWindowSize(){
  let w = document.documentElement.clientWidth;
  let h = document.documentElement.clientHeight;
  let oldstate= stateWindowSize;
  if(w<700){
    nbData=5;
    console.log(nbData)
    stateWindowSize =1;
  } else {
    nbData=50;
    console.log(nbData)
    stateWindowSize = 0;
  }
  if (oldstate == stateWindowSize){
    return;
  } else {
    await fetchTemperature();
    await fetchHumidite();
    await fetchTime();
  
    if (chart) {
      chart.destroy();
    }
    createGraph();
  }

}
window.addEventListener("resize", displayWindowSize);
displayWindowSize();
