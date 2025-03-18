function ClicMail() {
  let humDiv = document.getElementById("hum");
  let humString = humDiv.textContent;
  let humValue = parseInt(humString, 10);

  let tempDiv = document.getElementById("temp");
  let tempString = tempDiv.textContent;
  let tempValue = parseInt(tempString, 10);

  let message = `🌤️ Dernier relevé météo :
- Température : ${tempValue}°C
- Humidité : ${humValue}%`;
  let mailtoLink = `mailto:?subject=Relevé Météo&body=${encodeURIComponent(message)}`;
  
  window.location.href = mailtoLink;

}

function ClicFacebook() {
  let urlAPartager = encodeURIComponent("https://iotcesi.alwaysdata.net/"); // Mets ici une vraie URL
            let url = `https://www.facebook.com/sharer/sharer.php?u=${urlAPartager}`;
            window.open(url, '_blank', 'width=600,height=400');
}
function ClicX() {
    let humDiv = document.getElementById("hum");
    let humString = humDiv.textContent.trim();
    let humValue = parseFloat(humString);

    let tempDiv = document.getElementById("temp");
    let tempString = tempDiv.textContent.trim();
    let tempValue = parseFloat(tempString);

    // Vérifier si les valeurs sont valides
    if (isNaN(humValue) || isNaN(tempValue)) {
        alert("Erreur : Impossible de récupérer la température ou l'humidité.");
        return;
    }

    let message = `🌤️ Dernier relevé météo : Température : ${tempValue}°C / Humidité : ${humValue}%`;
    let url = encodeURIComponent(window.location.href);
    let twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${url}`;

    window.open(twitterShareUrl, '_blank', 'width=600,height=400');
}
function exportToCSV() {
    if (!valeurTime || !valeurTemp || !valeurHum) {
      console.error("Données non disponibles !");
      return;
    }
  
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Heure;Temperature;Humidite\n"; // En-tête du fichier CSV
  
    // Remplir les données (assure-toi que les tableaux ont la même longueur)
    for (let i = 0; i < valeurTime.length; i++) {
      let time = valeurTime[i] || "-";
      let temp = valeurTemp[i] || "-";
      let hum = valeurHum[i] || "-";
      csvContent += `${time};${temp};${hum}\n`;
    }
  
    // Création du fichier et téléchargement
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "donnees_meteo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  