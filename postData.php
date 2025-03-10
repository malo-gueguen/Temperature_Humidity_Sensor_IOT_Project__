<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require __DIR__ . '/vendor/autoload.php';
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET["temperature"]) && isset($_GET["humidite"])) {
        $temperature = $_GET["temperature"];
        $humidite = $_GET["humidite"];

        try {
            $dsn = sprintf(
                "mysql:host=%s;dbname=%s;charset=utf8mb4",
                $_ENV['DB_HOST'],
                $_ENV['DB_NAME'],
            );
            $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            $stmt = $pdo->prepare("INSERT INTO datas (Humidite, Temperature) VALUES (:humidite, :temperature)");
            $stmt->execute([
                ":humidite" => $humidite,
                ":temperature" => $temperature
            ]);
       
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to load data: " . $e->getMessage()]);
        }

        echo json_encode([
            "message" => "✅ Données bien reçues en GET",
            "temperature" => $temperature,
            "humidite" => $humidite



        ]);
    } else {
        echo json_encode(["error" => "🛑 Paramètres manquants"]);
    }
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(["error" => "⚠️ JSON invalide reçu", "brut" => $json]);
        exit();
    }

    if (!isset($data["temperature"]) || !isset($data["humidite"])) {
        echo json_encode(["error" => "⚠️ Données manquantes"]);
        exit();
    }

    echo json_encode(["message" => "✅ Données bien reçues en POST", "data" => $data]);
    exit();
}

echo json_encode(["error" => "Mauvaise méthode HTTP"]);
exit();
