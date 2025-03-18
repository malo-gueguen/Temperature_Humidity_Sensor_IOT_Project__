<?php 
        use Dotenv\Dotenv;
    
        error_reporting(E_ALL);
        ini_set("display_errors", 1);

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");

        require __DIR__ . '/vendor/autoload.php';
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        $dsn = sprintf(
            "mysql:host=%s;dbname=%s;charset=utf8mb4",
            $_ENV['DB_HOST'],
            $_ENV['DB_NAME']
            );

        $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
?>