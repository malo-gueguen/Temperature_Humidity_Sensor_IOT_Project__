# Station Météo - Détection de Température et d'Humidité
### Ce projet consiste en une station météo simple qui mesure la température et l'humidité de l'environnement. Il utilise un capteur de température et d'humidité connecté à un microcontrôleur. Les données mesurées sont affichées et enregistrées pour un usage ultérieur.

## 🚀 Fonctionnalités
- Mesure de la température : Détecte la température en degrés Celsius.
- Mesure de l'humidité : Détecte le taux d'humidité relative.
- Affichage des résultats : Affichage en temps réel de la température et de l'humidité via un écran LCD et transmission à un serveur via une interface web.
- Historique des données : Enregistrement dans une base de données pour un suivi à long terme.
## 🛠️ Matériel Nécessaire
- Microcontrôleur : ESP32 (Wifi Lora 32 V3).
- Capteur de température et d'humidité : DHT22.
- Affichage : Écran LCD (Parallele).
- Alimentation : Câble USB C.
- Potentiomètre
- Câbles de connexion.
## 💻 Logiciels
- IDE Arduino.
  - Bibliothèques Arduino :
    - DHT sensor library 
    - LiquidCrystal
  - Gestion Cartes arduino :
    - ESP32 board package
## 📝 Installation
### 1. Installation des Bibliothèques

Ouvrez l'IDE Arduino.

Allez dans Croquis > Inclure une bibliothèque > Gérer les bibliothèques.
Recherchez et installez les bibliothèques :
- DHT sensor library de Adafruit
- Adafruit Unified Sensor
### 2. Installation de la carte 
Ouvrez l'IDE Arduino et allez dans Fichier > Préférences.

Dans URL de gestionnaire de cartes supplémentaires, ajoutez l'URL suivante :
 ```
 https://dl.espressif.com/dl/package_esp32_index.json
```

Allez dans Outils > Cartes > Gestionnaire de cartes, cherchez "ESP32" et installez la carte "esp32 by Espressif Systems".

## 3. Téléversement du Code

``` bash
git clone https://github.com/LucasRaoul/Temperature_Humidity_Sensor_IOT_Project__.git
cd Temperature_Humidity_Sensor_IOT_Project__
```
## ⚡ Cablage
- DHT22 :

VCC → 5V.

GND → GND.

OUT → GPIO 21.

- Potentiomètre :

BORNE+ → 5V

BORNE- → GND

OUT → V0 (écran LCD)

- Écran LCD :

VSS → GND

VDD → 5V

V0 → OUT (potentiomètre)

RS → GPIO 48

R/W → GND

E → GPIO 47

DB4 → GPIO 33

DB5 → GPIO 34

DB6 → GPIO 35

DB7 → GPIO 36

LED+ → 5V

LED- → GND

## 🔧 Problèmes récurents
1. L'IDE arduino ne détecte pas l'ESP32
- Appuiez sur 🪟 + X → Gestionnaire de périphériques
- Regardez sous Ports (COM & LPT)
- Si vous voyez quelque chose comme "CP210x" ou "USB to UART", c’est bon.
- Si rien n’apparaît ou un périphérique est en erreur:
  -  installez le pilote ```https://www.silabs.com/documents/public/software/CP210x_VCP_Windows.zip```
  - Redémarrez votre PC après installation.
2. ...
## 👨‍💻 Auteurs
Lucas Raoul - @LucasRaoul

Benjamin Léon - @BENJ0UK

Malo Gueguen - @malo-gueguen

Lilian Fischer - @SystemD3v
