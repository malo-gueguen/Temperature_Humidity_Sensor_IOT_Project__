#include "DHT.h"
#include <LiquidCrystal.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "time.h"

#define DHTPIN 21
#define DHTTYPE DHT22

// Déclare un objet de type DHT
// Il faut passer en paramètre du constructeur de l'objet la broche et le type de capteur
DHT dht(DHTPIN, DHTTYPE);

// Broches de l'écran LCD (RS, E, D4, D5, D6, D7)
LiquidCrystal lcd(48,47,33,34,35,36);

//Paramètres Wifi
const char* ssid = "iPhone de Malo";
const char* password = "malogueguen";
const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 3600;  // Adjust for your timezone
const int   daylightOffset_sec = 3600;
int compteur=0;
float moyenneTempA =0;
float moyenneHumA =0;
float moyenneTempB =0;
float moyenneHumB =0;

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
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
 
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
    compteur++;
    if (compteur<=5){
      moyenneHumA=moyenneHumA+humidite;
      moyenneTempA=moyenneTempA+temperature;
    }
    else{
      compteur=0;
      moyenneHumB=moyenneHumA/5;
      moyenneTempB=moyenneTempA/5;
    }
     


    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        Serial.println("Failed to obtain time");
        return;
    }

    Serial.print("Current Local Time: ");
    Serial.printf("%02d:%02d:%02d\n", timeinfo.tm_hour, timeinfo.tm_min, timeinfo.tm_sec);
    int heure = timeinfo.tm_hour-1;
    int min = timeinfo.tm_min;
    int sec = timeinfo.tm_sec;

    // Vérifie si 3 secondes sont passées
    if (tempsActuel - dernierChangement >= 3000) {  
        modeAffichage = (modeAffichage + 1) % 2; // Passe au mode suivant (0 → 1 → 2 → 0)
        dernierChangement = tempsActuel; // Met à jour le dernier changement
        lcd.clear(); // Efface l'écran pour éviter les superpositions
    }

    // Affichage en fonction du mode
    
    if (modeAffichage == 0) {
        lcd.setCursor(0, 0);
        lcd.print("Temp: " + String(moyenneTempB) + "C");
        lcd.setCursor(0, 1);
        lcd.print("Hum: " + String(moyenneHumB) + "%");
    } 
    else if (modeAffichage == 1) {
        lcd.setCursor(0, 0);
        lcd.print("IP: " + WiFi.localIP().toString());
        lcd.setCursor(0, 1);
        lcd.print("Time: " + String(heure) + ":" + String(min) + ":" + String(sec));
    }

    delay(100); 




// Requête GET
  if (WiFi.status() == WL_CONNECTED) { // Vérifie si le WiFi est connecté
    HTTPClient http;
    String serverUrl = "http://iotcesi.alwaysdata.net/BackEnd/PHP/postData.php"; 
    String url = serverUrl + "?temperature=" + String(temperature) + "&humidite=" + String(humidite);
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
