<?php 
    include 'db_conn.php';

    try {
        $request = $pdo->query("SELECT * FROM Users");
        while ($row = $request->fetch(mode: PDO::FETCH_ASSOC)) {

            $data[] = [
                "password" => $row['password'],
                "user" => $row['user']
            ];
        }
        echo json_encode($data);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to load data: " . $e->getMessage()]);
    }
?>