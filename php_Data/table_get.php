<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Datos de conexión a PostgreSQL en Neon
$servername = "ep-tight-sun-a56lndhd-pooler.us-east-2.aws.neon.tech";
$username = "ZonaDeli_owner";
$password = "npg_8sRhWT6qSPHL";
$dbname = "ZonaDeli"; 

try {
    // Conexión con PostgreSQL usando PDO
    $conn = new PDO("pgsql:host=$servername;dbname=$dbname", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit;
}

try {
    // Consultar todos los contactos
    $sql = "SELECT * FROM contactos";
    $stmt = $conn->query($sql);
    
    // Obtener los resultados en un array asociativo
    $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Devolver los datos en formato JSON
    echo json_encode($datos);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error al obtener datos: " . $e->getMessage()]);
}

// Cerrar conexión
$conn = null;
?>
