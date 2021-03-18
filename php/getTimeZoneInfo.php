<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);
$_POST['lat'] = $_POST['lat'] == '' ? 20.0 : $_POST['lat'];
$_POST['lng'] = $_POST['lng'] == '' ? 20.0 : $_POST['lng'];

$url = "https://secure.geonames.org/timezoneJSON?lat={$_POST['lat']}&lng={$_POST['lng']}&username=hubertkoy";

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);