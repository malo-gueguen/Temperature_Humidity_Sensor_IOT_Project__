<?php 
//décoder le json reçu

    include 'db_conn.php';

    $json= file_get_contents("php://input");
    $data=json_decode($json, true);
   
//vérifier doublons

    $user = htmlspecialchars($data["user"]);
    $password = htmlspecialchars($data["password"]);
    $count = $pdo->prepare("SELECT COUNT(*) FROM Users WHERE user = :inputUser");
    $count->bindParam(':inputUser', $user, PDO::PARAM_STR);
    $count->execute();
    $numdoublon = $count->fetchColumn();

    

// créer nouvel user

    if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($user) && !empty($password)){

        if($numdoublon != 0){
            echo json_encode(["status" => "duplicate", "count" => $numdoublon]);
            return;
        }
        
        try{
            $request = $pdo->prepare("INSERT INTO Users (user, password) VALUES (:user, :password)");
            $request->bindParam(':user', $user,PDO::PARAM_STR);       
            $request->bindParam(':password', $password, PDO::PARAM_STR);  
            $request->execute(); 
            echo json_encode(["status" => "success"]);     
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to load data: " . $e->getMessage()]);
        }

    }else{
        echo ("Erreur: remplissez les champs svp");
    }


   
?>
   