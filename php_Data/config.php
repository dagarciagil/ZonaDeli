<?php

$servername = "ep-tight-sun-a56lndhd-pooler.us-east-2.aws.neon.tech";
$username = "ZonaDeli_owner";
$password = "npg_8sRhWT6qSPHL";
$dbname = "ZonaDeli"; 
        
try {
    $conn = new PDO("pgsql:host=$servername;dbname=$dbname", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

if ($conection->connect_error) {
    die("Error de conexión: " . $conection->connect_error); //si hay un error, se muestra el mensaje de error.
} 
?>