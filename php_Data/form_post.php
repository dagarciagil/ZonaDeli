<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Verificar que la solicitud sea POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Método no permitido"]);
    http_response_code(405);
    exit;
}

// Datos de conexión a PostgreSQL
$servername = "ep-tight-sun-a56lndhd-pooler.us-east-2.aws.neon.tech";
$username = "ZonaDeli_owner";
$password = "npg_8sRhWT6qSPHL";
$dbname = "ZonaDeli"; 

try {
    $conn = new PDO("pgsql:host=$servername;dbname=$dbname", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit;
}

// Obtener el JSON enviado en la solicitud
$json = file_get_contents("php://input");
$datos = json_decode($json, true);

$name = $datos["name"] ?? null;
$email = $datos["email"] ?? null;
$celular = $datos["celular"] ?? null;

if ($name && $email && $celular) {
    try {
        $stmt = $conn->prepare("INSERT INTO contactos (name, email, celular) VALUES (:name, :email, :celular)");
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":celular", $celular);

        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Registro exitoso"]);
        } else {
            echo json_encode(["error" => "Error al guardar los datos"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Datos incompletos"]);
}

$conn = null;
?>
