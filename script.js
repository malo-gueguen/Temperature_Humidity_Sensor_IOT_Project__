let valeurTemp;
let valeurHum;
let valeurTime;
let ctx = document.getElementById("myChart").getContext("2d");
let chart;

let nbData = 50; 
let labelsGraph = [];
for (let i=0; i< nbData; i++){
  labelsGraph.push("-")
}

async function fetchTemperature() {
  try {
    const response = await fetch("https://iotcesi.alwaysdata.net/getTemp.php", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    let htmlvar2 = '';
    valeurTemp = [];
    data.forEach(item => {
      htmlvar2 += `${item.Temperature} °C `;
      if (valeurTemp.length < nbData) {
        valeurTemp.push(item.Temperature);
      }
    });
    console.log(`Température : ${valeurTemp}`);
    document.getElementById('temp').innerHTML = htmlvar2;
    updateTemperature();
  } catch (error) {
    console.error("Error in fetchTemperature: ", error);
  }
}

async function fetchTime() {
  try {
    const response = await fetch("https://iotcesi.alwaysdata.net/getTime.php", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    valeurTime = [];
    data.forEach(item => {
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
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    let htmlvar = '';
    valeurHum = [];
    data.forEach(item => {
      htmlvar += `${item.Humidite} °C `;
      if (valeurHum.length < nbData) {
        valeurHum.push(item.Humidite);
      }
    });
    console.log(`Humidité : ${valeurHum}`);
    document.getElementById('hum').innerHTML = htmlvar;
    updateHumidty();

    // Mise à jour de l'heure
    mettreAJourHeure();
    setInterval(mettreAJourHeure, 1000);
  } catch (error) {
    console.error("Error in fetchHumidite: ", error);
  }
}

function updateTemperature() {
  let tempDiv = document.getElementById('temp');
  let message = document.getElementById('message');
  let tempString = tempDiv.textContent;
  let tempValue = parseInt(tempString, 10);
  
  if (tempValue >= 25) {
    tempDiv.innerHTML = tempValue + "°C";
    message.innerHTML = "☀️ Il fait beau !";
  } else if (tempValue >= 10) {
    tempDiv.textContent = tempValue + "°C";
    message.innerHTML = "☁️ Il fait doux !";
  } else {
    tempDiv.textContent = tempValue + "°C";
    message.innerHTML = "❄️ Il fait froid !";
  }
}

function updateHumidty() {
  let humDiv = document.getElementById('hum');
  let message = document.getElementById('message2');
  let container = document.querySelector('#humContainer');
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

function mettreAJourHeure() {
  const maintenant = new Date();
  const optionsDate = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  let dateFormatee = maintenant.toLocaleDateString('fr-FR', optionsDate);
  let morceaux = dateFormatee.split(' ');
  morceaux[0] = morceaux[0].charAt(0).toUpperCase() + morceaux[0].slice(1);
  dateFormatee = morceaux.join(' ');
  const heureFormatee = maintenant.toLocaleTimeString('fr-FR');
  document.getElementById('time').textContent = dateFormatee + ' — ' + heureFormatee;
}

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
          max: 100,
          ticks: {
            stepSize: 5
          }
        }
      },
    },
  });
  console.log("Graphique créé");
}

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




let loginBox = document.getElementById("login_box");
loginBox.addEventListener("click", function() {
  let nbDataSelector = document.getElementsById("nbDataSelector")
  nbDataSelector.classList.remove("hidden");
})

