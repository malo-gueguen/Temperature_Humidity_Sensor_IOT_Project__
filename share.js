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
              let texte = encodeURIComponent("Découvrez ce super contenu !");
              let url = `https://www.facebook.com/sharer/sharer.php?u=${urlAPartager}&quote=${texte}`;
              window.open(url, '_blank', 'width=600,height=400');
  }
  function ClicX() {
      let humDiv = document.getElementById("hum");
    let humString = humDiv.textContent;
    let humValue = parseInt(humString, 10);
  
    let tempDiv = document.getElementById("temp");
    let tempString = tempDiv.textContent;
    let tempValue = parseInt(tempString, 10);
  
    let message = `🌤️ Dernier relevé météo :
   Température : ${tempValue}°C / Humidité : ${humValue}%`;
    const url = encodeURIComponent(window.location.href);
              const fbShareUrl = `https://twitter.com/intent/tweet?text=${message}`;
              window.open(fbShareUrl, '_blank', 'width=600,height=400');
  }