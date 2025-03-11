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

try {
    $dsn = sprintf(
        "mysql:host=%s;dbname=%s;charset=utf8mb4",
        $_ENV['DB_HOST'],
        $_ENV['DB_NAME'],
    );
    $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $request = $pdo->query("SELECT * FROM Users");
    while ($row = $request->fetch(PDO::FETCH_ASSOC)) {
        $data[] = [
            "password" => $row['password'],
            "user" => $row['user']
        ];
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to load data: " . $e->getMessage()]);
}
?>