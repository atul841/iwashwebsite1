<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name  = htmlspecialchars($_POST['name']);
    $mobile = htmlspecialchars($_POST['mobile']);
    $city  = htmlspecialchars($_POST['city']);
    $req   = htmlspecialchars($_POST['requirement']);

    // Save to database
    $stmt = $conn->prepare("INSERT INTO laundry_leads (name, mobile, city, requirement) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $mobile, $city, $req);
    $stmt->execute();
    $stmt->close();

    // Email details
    $to = "upsalesaditya@iwashhub.com, sales_service_rohit@iwashhub.com, Indiasales.yash@iwashhub.com";
    $subject = "New Laundry Pickup Request - iWashHub";

    $message = "
    New Laundry Lead Received 🧺

    Name: $name
    Mobile: $mobile
    City: $city
    Requirement: $req

    Date: " . date("d-m-Y h:i A") . "
    ";

    $headers = "From: iWashHub <no-reply@iwashhub.com>";

    mail($to, $subject, $message, $headers);

    echo "success";
}
?>
