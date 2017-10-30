<?php
	$eol = PHP_EOL;
	$name = $_POST['name'];
	$email = $_POST['email'];
	$comments = $_POST['comments'];
	$name = htmlspecialchars($name);
	$email = htmlspecialchars($email);
	$comments = htmlspecialchars($comments);
	$name = urldecode($name);
	$email = urldecode($email);
	$comments = urldecode($comments);
	$name = trim($name);
	$email = trim($email);
	$comments = trim($comments);
	//echo $fio;
	//echo "<br>";
	//echo $email;
	$message = "Имя: ".$name.". E-mail: ".$email."\n";
	$message .= "Comments: ".$comments."\n".$eol;
	$header = "From: admin@track2check.com".$eol;
	mail("rentgen.94@mail.ru", "Отправка с сайта track2check.com", $message, $header);
?>