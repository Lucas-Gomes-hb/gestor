<?php
header('Access-Control-Allow-Origin: *'); 
header('Content-type:application/json;charset=utf-8');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$return = array();
$error = false;
$returnAPI = "";
$CONNECTION = new PDO("mysql:host=127.0.0.1;dbname=gestor;charset=utf8mb4", "root", "", []);

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'POST':
        $action = $_POST["action"];
        $data = $_POST["info"];

        switch ($action) {
            case "user":
                include_once("process/user.php");
                break;
            case "item":
                include_once("process/item.php");
                break;
            case "address":
                include_once("process/address.php");
                break;
            case "order":
                include_once("process/order.php");
                break;
            default:
                $error = "No map action";
                break;
        }
        
        break;
    case "GET":
        ob_start();
        if(file_exists("cache/cache.json")){
            $json = json_decode(file_get_contents("cache/cache.json"));
            $returnAPI = $json;
        }else{

        }
        $returnAPI = array();
        break;
    default:
        $error = "No map request method";
        break;
}


//Retorno da API
if(!$error) header("HTTP/1.1 200 OK"); else header("HTTP/1.1 400 Bad Request");
$return['status'] = ($error) ? false : true;
if(!$error)$return['return'] = $returnAPI;

if($error) $return['error'] = $error; 
if($error) $return['error']['date'] = date(DATE_ISO8601); 
echo json_encode($return);
?>