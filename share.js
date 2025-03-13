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
