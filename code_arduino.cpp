#include "DHT.h"
#include <LiquidCrystal.h>
#include <WiFi.h>
#include <HTTPClient.h>


#define DHTPIN 21
#define DHTTYPE DHT22

// Déclare un objet de type DHT
// Il faut passer en paramètre du constructeur de l'objet la broche et le type de capteur
DHT dht(DHTPIN, DHTTYPE);

// Broches de l'écran LCD (RS, E, D4, D5, D6, D7)
LiquidCrystal lcd(48,47,33,34,35,36);

//Paramètres Wifi
const char* ssid = "nom du wifi";
const char* password = "mot de passe du wifi";

void setup() {
  Serial.begin(9600);

  // Etablir la connection au WiFi
  WiFi.begin(ssid, password);
  
  Serial.print("Connexion au WiFi...");
  
  // Attente de la connexion
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnecté au WiFi !");
  Serial.print("Adresse IP: ");
  Serial.println(WiFi.localIP());

 
 //capteur + LCD
  dht.begin();
  lcd.begin(16, 2);
  
  lcd.setCursor(0, 0);
  lcd.print("Salut !");
  delay(2000); 
  lcd.clear();
}

void loop() {
    float temperature = dht.readTemperature();
    float humidite = dht.readHumidity();
    static int modeAffichage = 0;  // Variable pour alterner l'affichage
    static unsigned long dernierChangement = 0; // Temps du dernier changement
    unsigned long tempsActuel = millis(); // Temps actuel

    // Vérifie si 3 secondes sont passées
    if (tempsActuel - dernierChangement >= 3000) {  
        modeAffichage = (modeAffichage + 1) % 2; // Passe au mode suivant (0 → 1 → 2 → 0)
        dernierChangement = tempsActuel; // Met à jour le dernier changement
        lcd.clear(); // Efface l'écran pour éviter les superpositions
    }

    // Affichage en fonction du mode
    
    if (modeAffichage == 0) {
        lcd.setCursor(0, 0);
        lcd.print("Temp: " + String(temperature) + "C");
        lcd.setCursor(0, 1);
        lcd.print("Hum: " + String(humidite) + " %");
    } 
    else if (modeAffichage == 1) {
        lcd.setCursor(0, 0);
        lcd.print("IP: " + WiFi.localIP().toString());
    }

    delay(100); // Petite pause pour éviter une boucle trop rapide




// Requête GET
  if (WiFi.status() == WL_CONNECTED) { // Vérifie si le WiFi est connecté
    HTTPClient http;
    String serverUrl = "http://iotcesi.alwaysdata.net/postData.php"; 
    String url = serverUrl + "?temperature=" + String(temperature) + "&humidite=" + String(humidite);// Remplace par ton URL
    http.begin(url);
    Serial.println("📡 URL envoyée : " + url);

    int httpCode = http.GET(); // 🔹 Envoi de la requête GET

        if (httpCode > 0) {
            String response = http.getString();
            Serial.println("📥 Réponse du serveur : " + response);
        } else {
            Serial.print("🛑 Erreur HTTP : ");
            Serial.println(httpCode);
        }

        http.end();
    } else {
        Serial.println("🛑 WiFi non connecté !");
    }


  delay(10000); // Attendre 10 secondes avant une nouvelle requête

}
