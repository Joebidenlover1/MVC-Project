<?php
session_start(); // Start session

$host = "localhost";
$dbname = "login3"; // Your database name
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $inputUsername = $_POST["username"];
        $inputPassword = $_POST["password"];

        // Prepare the SQL statement to prevent SQL injection
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->bindParam(":username", $inputUsername);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($inputPassword, $user["password"])) {
            $_SESSION["username"] = $user["username"]; // Store username in session
            header("Location: homepage.html"); // Redirect to homepage
            exit();
        } else {
            echo "Invalid username or password!";
        }
    }
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
