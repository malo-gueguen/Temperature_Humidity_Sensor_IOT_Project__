<?php 
//décoder le json reçu
    include 'db_conn.php';
    $json= file_get_contents("php://input");
    $data=json_decode($json, true);
    if ($data) {
            echo json_encode(["message" => "Données reçues", "data" => $data]);
        } else {
            echo json_encode(["message" => "Erreur de décodage JSON"]);
        }

//vérifier doublons
    

// créer nouvel user
    if ($_SERVER["REQUEST_METHOD"] === "POST"){
        try{
            $user = htmlspecialchars($data["user"]);
            echo ($user);
            $password = htmlspecialchars($data["password"]);
            echo ($password);
            $request = $pdo->prepare("INSERT INTO Users (user, password) VALUES (:user, :password)");
            $request->bindParam(':user', $user,PDO::PARAM_STR);       
            $request->bindParam(':password', $user, PDO::PARAM_STR);  
            $request->execute();      
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to load data: " . $e->getMessage()]);
        }
    }
?>
