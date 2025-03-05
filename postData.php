<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Vérifier que la requête utilise bien la méthode POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer et valider les données envoyées
    $temperature = isset($_POST['temperature']) ? floatval($_POST['temperature']) : null;
    $humidity = isset($_POST['humidity']) ? floatval($_POST['humidity']) : null;

    if ($temperature === null || $humidity === null) {
        echo json_encode(["error" => "Données manquantes"]);
        exit;
    }

    // Connexion à la base de données
    $dsn = "mysql:host=localhost:3307;dbname=data_iot;charset=utf8mb4";
    $username = "iot";
    $password = "lucas";     // Remplacez par votre mot de passe

    try {
        $pdo = new PDO($dsn, $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Préparer la requête d'insertion
        $sql = "INSERT INTO data (temperature, humidity) VALUES (:temperature, :humidity)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':temperature', $temperature);
        $stmt->bindParam(':humidity', $humidity);
        $stmt->execute();

        echo json_encode(["success" => "Données insérées"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Mauvaise méthode HTTP"]);
}
?>
