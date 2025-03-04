function mettreAJourHeure() {
  const maintenant = new Date();

  // On récupère la date complète en français, ex. "jeudi 9 mars 2025"
  const optionsDate = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  let dateFormatee = maintenant.toLocaleDateString('fr-FR', optionsDate);

  // On découpe le résultat en mots séparés par des espaces
  let morceaux = dateFormatee.split(' '); 
  // Par défaut : ["jeudi", "9", "mars", "2025"]

  // On prend le 1er mot (le jour) et on met sa 1re lettre en majuscule
  // "jeudi" => "Jeudi"
  morceaux[0] = morceaux[0].charAt(0).toUpperCase() + morceaux[0].slice(1);

  // On reconstitue la chaîne finale
  dateFormatee = morceaux.join(' ');

  // Formatage de l'heure (restant en français)
  const heureFormatee = maintenant.toLocaleTimeString('fr-FR');

  // On met le tout dans #time
  document.getElementById('time').textContent = dateFormatee + ' — ' + heureFormatee;
}

// Appel initial et mise à jour régulière
mettreAJourHeure();
setInterval(mettreAJourHeure, 1000);


function updateTemperature() {
    // Récupère l'élément contenant la température (ex. "21°C")
    let tempDiv = document.getElementById('temp');
    let message = document.getElementById('message');
    
    // Récupère le texte : ex. "21°C"
    let tempString = tempDiv.textContent;
    
    // Extrait la valeur numérique (21) de la chaîne "21°C"
    // parseInt s'arrête au premier caractère non numérique (ici, le symbole °)
    let tempValue = parseInt(tempString, 10);
  
    // Comparaison
    if (tempValue >= 25) {
      tempDiv.innerHTML = tempValue + "°C";
      message.innerHTML = "☀️ Il fait beau !";
    } else if (tempValue >= 10) {
      tempDiv.textContent = tempValue + "°C";
      message.innerHTML ="☁️ Il fait doux !"
    } else {
      tempDiv.textContent = tempValue + "°C!";
      message.innerHTML ="❄️ Il fait beau !"
    }
  }
  function updateHumidty() {
    // Récupère l'élément contenant la température (ex. "21°C")
    let humDiv = document.getElementById('hum');
    let message = document.getElementById('message2');

    // Récupère le texte : ex. "21°C"
    let humString = humDiv.textContent;
    
    // Extrait la valeur numérique (21) de la chaîne "21°C"
    // parseInt s'arrête au premier caractère non numérique (ici, le symbole °)
    let humValue = parseInt(humString, 10);

    // Comparaison
    if (humValue >= 60) {
        humDiv.textContent = humValue + "%";
        message.innerHTML ="Humide 💧"

    } else if (humValue >= 30 && humValue <= 60) {
        humDiv.textContent = humValue + "%";
        message.innerHTML ="Normal 🌤"

    } else {
        humDiv.textContent = humValue + "%";
        message.innerHTML ="Sec 🌵"
    }
  }
updateTemperature();
updateHumidty();
