<?php
$host = "localhost";
$user = "DB_USERNAME";
$pass = "DB_PASSWORD";
$db   = "DB_NAME";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Database connection failed");
}
?>
