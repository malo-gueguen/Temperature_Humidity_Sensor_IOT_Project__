<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
    $dsn = "mysql:host=localhost:3307;dbname=data_iot;charset=utf8mb4";
    $username = "iot";
    $password = "lucas";
    $pdo = new PDO($dsn, $username, $password); // connect to db for the request
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $request = $pdo->query("SELECT humidity FROM data");
    $data = [];
    while ($row = $request->fetch(PDO::FETCH_ASSOC)) {
        $data[] = [
            "humidity" => $row['humidity'],
        ];
    }

    echo json_encode($data);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to load data: " . $e->getMessage()]);
}
?>
