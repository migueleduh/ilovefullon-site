<?php
header('Content-Type: application/json');

// Credenciais
$client_id = 'e19f69249e9e4b35913a15048d5de962';
$client_secret = 'a31adf8f13bb4605bbaa30ba3e9004ab';

// Obter token via cURL
$ch = curl_init('https://accounts.spotify.com/api/token');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Authorization: Basic ' . base64_encode("$client_id:$client_secret"),
  'Content-Type: application/x-www-form-urlencoded'
]);
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
if (empty($data['access_token'])) {
  http_response_code(500);
  echo json_encode(['error' => 'Falha ao obter token', 'spotify_response' => $data]);
  exit;
}

// Busca artistas
$q = urlencode($_GET['q'] ?? '');
$ch = curl_init("https://api.spotify.com/v1/search?q=$q&type=artist&limit=5");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Authorization: Bearer ' . $data['access_token']
]);
$result = curl_exec($ch);
curl_close($ch);

echo $result;
