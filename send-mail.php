<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Secure form data
  $name   = htmlspecialchars(trim($_POST['name']));
  $mobile = htmlspecialchars(trim($_POST['mobile']));
  $city   = htmlspecialchars(trim($_POST['city']));

  // Receiver emails (3 IDs)
  $to = "sales_service_rohit@iwashhub.com, upsalesaditya@iwashhub.com, Indiasales.yash@iwashhub.com";

  // Email subject
  $subject = "New Lead Received - iWash Hub";

  // Email message
  $message = "
Hello Team,

A new lead has been received from the website.

Name   : $name
Mobile : $mobile
City   : $city

Regards,
iWash Hub Website
";

  // Headers
  $headers  = "From: iWash Hub <@iwashhub.com>\r\n";
  $headers .= "Reply-To: info@iwashhub.com\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  // Send mail
  if (mail($to, $subject, $message, $headers)) {
    header("Location: thank-you.html"); // optional
    exit;
  } else {
    echo "Email sending failed. Please try again.";
  }
}
?>
